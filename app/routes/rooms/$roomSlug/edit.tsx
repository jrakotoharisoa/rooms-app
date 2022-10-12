import type { Equipment } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Params } from "react-router";
import invariant from "tiny-invariant";
import {
  equipements,
  initialEquipment,
  isEquipementChecked
} from "~/rooms/equipments";
import { roomConfigurations } from "~/rooms/room-configurations";
import type { Room } from "~/rooms/room-repository.server";
import { getRoomBySlug, updateRoom } from "~/rooms/room-repository.server";
import { Button } from "~/ui/Button";
import { CheckboxField } from "~/ui/CheckboxField";
import { SelectField } from "~/ui/SelectField";
import { TextField } from "~/ui/TextField";

type LoaderData = {
  room: Room & { equipment: Equipment | null };
};

export const loader: LoaderFunction = async ({ params }) => {
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
      <div className="flex justify-center">
        <Button type="submit">Sauvegarder</Button>
      </div>
    </Form>
  );
}

const extractRoomData = async (
  formData: FormData,
  params: Params
): Promise<Room & { equipments: Equipment }> => {
  invariant(params.roomSlug, "roomSlug not found");
  const room = await getRoomBySlug(params.roomSlug);
  invariant(room, "Room not found");

  const name = formData.get("name");
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
