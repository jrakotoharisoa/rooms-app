import { LoaderFunction } from "remix";
import path from "path";
import fs from "fs";
import invariant from "tiny-invariant";
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.roomSlug, "roomSlug not found");

  const file = fs.readFileSync(
    path.resolve(__dirname, `../app/rooms/pictures/${params.roomSlug}.jpg`)
  );

  return new Response(file, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};
