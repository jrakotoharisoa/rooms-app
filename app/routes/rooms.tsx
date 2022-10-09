import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { List } from "~/rooms/List";
import { getRoomListItems } from "~/rooms/room-repository.server";
import comet from "~/ui/comet.svg";

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
    <>
      <TopBar>
        <img src={comet} alt="Comet Meetings" className="m-3" />
      </TopBar>
      <Container>
        <Grid>
          <div>
            <List rooms={roomListItems} />
          </div>
          <div>
            <Outlet />
          </div>
        </Grid>
      </Container>
    </>
  );
}

const TopBar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex justify-center border-b border-white">{children}</div>
);
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="m-auto max-w-5xl space-y-10 p-10">{children}</div>
);

const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-list gap-4">{children}</div>
);
