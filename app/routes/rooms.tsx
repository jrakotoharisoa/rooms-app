import { json, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { List } from "~/rooms/List";
import { getRoomListItems } from "~/rooms/room-repository.server";
import { Heading } from "~/ui/Heading";

type LoaderData = {
  roomListItems: Awaited<ReturnType<typeof getRoomListItems>>;
};

export const loader: LoaderFunction = async () => {
  const roomListItems = await getRoomListItems();
  return json<LoaderData>({ roomListItems });
};

export default function Rooms() {
  const { roomListItems } = useLoaderData();
  return (
    <Container>
      <div className="text-center">
        <Heading>SALLES COMET MEETINGS</Heading>
      </div>
      <Grid>
        <div>
          <List rooms={roomListItems} />
        </div>
        <div>
          <Outlet />
        </div>
      </Grid>
    </Container>
  );
}

const Container: React.FC = ({ children }) => (
  <div className="m-auto max-w-5xl space-y-10 p-10">{children}</div>
);

const Grid: React.FC = ({ children }) => (
  <div className="grid grid-cols-list gap-4">{children}</div>
);
