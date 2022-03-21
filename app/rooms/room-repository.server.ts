import type { Equipment, Room } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Room, Equipment } from "@prisma/client";

export const getRoomListItems = async () =>
  prisma.room.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

export const getRoomBySlug = async (slug: Room["slug"]) =>
  prisma.room.findUnique({ where: { slug }, include: { equipment: true } });

export const updateRoom = async ({
  equipments: { roomId, ...equipments },
  ...room
}: Room & { equipments: Equipment }) => {
  await prisma.room.update({
    where: { id: room.id },
    data: {
      ...room,
      equipment: {
        update: {
          ...equipments,
        },
      },
    },
  });
};
