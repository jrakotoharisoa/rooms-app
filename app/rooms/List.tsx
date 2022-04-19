import { NavLink, useTransition } from "remix";
import { Spinner } from "~/ui/Spinner";
import type { Room } from "./room-repository.server";

export const List: React.FC<{ rooms: Room[] }> = ({ rooms }) => {
  return (
    <ul className="space-y-3">
      {rooms.map((room) => (
        <li key={room.id}>
          <Item room={room} />
        </li>
      ))}
    </ul>
  );
};

const Item: React.FC<{ room: Room }> = ({ room }) => {
  const { state, location } = useTransition();
  const to = `/rooms/${room.slug}`;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block flex items-center  space-x-3 rounded border-2  p-1 ${
          isActive
            ? "border-primary bg-primary font-bold"
            : "border-white border-primary bg-white hover:font-bold hover:text-primary"
        }`
      }
    >
      <div className="flex">
        <img
          src={`/rooms/${room.slug}/image`}
          alt={room.name}
          className="min-h-[60px] max-w-[100px] rounded object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="text-2xl">{room.name}</div>
        {state === "loading" && location.pathname === to && <Spinner />}
      </div>
    </NavLink>
  );
};
