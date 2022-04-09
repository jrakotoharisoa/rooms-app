import type { LoaderFunction, MetaFunction } from "remix";
import { json, Outlet, useParams } from "remix";
import invariant from "tiny-invariant";
import type { Room } from "~/rooms/room-repository.server";
import { getRoomBySlug } from "~/rooms/room-repository.server";

type LoaderData = {
  room: Room;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `Salle ${data.room.name}`,
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.roomSlug, "roomSlug not found");
  const room = await getRoomBySlug(params.roomSlug);
  if (!room) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ room });
};

export default function RoomSlug() {
  const { roomSlug } = useParams<"roomSlug">();

  return (
    <Container>
      <div className="relative h-1/3">
        <img
          src={`/rooms/${roomSlug}/image`}
          alt={roomSlug}
          className="h-full w-full object-cover"
        />
        <Slug>/rooms/{roomSlug}</Slug>
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </Container>
  );
}

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-full overflow-hidden rounded  bg-white text-dark">
    {children}
  </div>
);

const Slug: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute bottom-0 m-5 rounded bg-white py-1 px-2 font-medium opacity-90">
    {children}
  </div>
);
