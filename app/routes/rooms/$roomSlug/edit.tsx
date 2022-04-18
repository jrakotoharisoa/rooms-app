import type { Equipment } from "@prisma/client";
import type { Params } from "react-router";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, redirect, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import type { Room } from "~/rooms/room-repository.server";
import { getRoomBySlug, updateRoom } from "~/rooms/room-repository.server";
import { Button } from "~/ui/Button";
import { CheckboxField } from "~/ui/CheckboxField";
import { SelectField } from "~/ui/SelectField";
import { TextField } from "~/ui/TextField";

type LoaderData = {
  room: Room & { equipment: Equipment | null };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.roomSlug, "roomSlug not found");
  const room = await getRoomBySlug(params.roomSlug);
  if (!room) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ room });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const roomData = await extractRoomData(formData, params);
  await updateRoom(roomData);
  return redirect(`/rooms/${params.roomSlug}`);
};

export default function RoomEdit() {
  const { room } = useLoaderData<LoaderData>();
  return (
    <Form className="space-y-5" method="post">
      <TextField label="Nom" name="name" defaultValue={room.name} />
      <SelectField
        label="Configuration"
        name="configuration"
        options={roomConfigurations}
        defaultValue={room.configuration}
      />
      <CheckboxField
        label="Equipements"
        name="equipments"
        choices={equipements.map(isEquipementChecked(room.equipment))}
      />
      <div className="text-center">
        <Button type="submit">Sauvegarder</Button>
      </div>
    </Form>
  );
}

const roomConfigurations = [
  { value: "BOARD", label: "Board" },
  { value: "CASUAL", label: "Casual" },
  { value: "THEATER", label: "Théâtre" },
  { value: "U", label: "Format U" },
];

type ChoiceOption = {
  value: Exclude<keyof Equipment, "roomId">;
  label: string;
};
const equipements: ChoiceOption[] = [
  { value: "tv", label: "Télévision 4K" },
  { value: "visio", label: "Visio conférence" },
  { value: "paperboard", label: "Paperboard" },
  { value: "videoprojector", label: "Vidéo projecteur" },
];

const isEquipementChecked =
  (equipment: Equipment | null) => (choice: ChoiceOption) => ({
    ...choice,
    defaultChecked: !!equipment?.[choice.value],
  });

const extractRoomData = async (
  formData: FormData,
  params: Params
): Promise<Room & { equipments: Equipment }> => {
  invariant(params.roomSlug, "roomSlug not found");
  const room = await getRoomBySlug(params.roomSlug);
  invariant(room, "Room not found");

  const name = await formData.get("name");
  invariant(name, "Name is invalid");

  const configuration = formData.get("configuration");
  invariant(
    configuration &&
      roomConfigurations
        .map(({ value }) => value)
        .includes(configuration.toString()),
    "configurtion is invalid"
  );

  const equipments = await formData.getAll("equipments[]");
  invariant(equipments, "equipments not found");

  return {
    ...room,
    name: `${name}`,
    configuration: `${configuration}`,
    equipments: equipments.reduce<Equipment>(
      (res: any, value: any) => {
        res[value] = true;
        return res;
      },
      {
        roomId: room.id,
        ...initialEquipment,
      }
    ),
  };
};

const initialEquipment = {
  tv: false,
  videoprojector: false,
  paperboard: false,
  visio: false,
};
