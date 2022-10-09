import type { Equipment } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Room } from "~/rooms/room-repository.server";
import { getRoomBySlug } from "~/rooms/room-repository.server";
import { LinkButton } from "~/ui/Button";

type LoaderData = {
  room: Room & { equipment: Equipment | null };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.roomSlug, "roomSlug not found");
  const room = await getRoomBySlug(params.roomSlug);

  if (!room) {
    throw new Response("Not Found", { status: 404 });
  }
  // await sleep(2000);
  return json<LoaderData>({ room });
};

export default function Index() {
  const { room } = useLoaderData<LoaderData>();
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Title>Salle {room.name}</Title>
        <LinkButton to="edit">Editer</LinkButton>
      </div>

      <div>
        <strong>Configuration:</strong> {room.configuration}
      </div>
      <div>
        <strong>Equipements:</strong>{" "}
        {room.equipment
          ? Object.entries(room.equipment)
              .filter(([, value]) => value === true)
              .map(([key]) => key.toUpperCase())
              .join(", ")
          : "aucun"}
      </div>
    </Container>
  );
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-3xl font-bold">{children}</div>;
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex-1">{children}</div>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sleep = (timeInMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeInMs));
