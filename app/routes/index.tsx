import type { MetaFunction } from "remix";
import { LinkButton } from "~/ui/Button";
import { Heading } from "~/ui/Heading";

export const meta: MetaFunction = () => {
  return {
    title: "Remix - Demo",
  };
};

export default function Index() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-5">
        <Heading>
          Hi, <span className="text-secondary">users</span> !
        </Heading>
        <div className="flex justify-center space-x-5">
          <LinkButton to="/me" isSecondary prefetch="render">
            /me
          </LinkButton>
          <LinkButton to="/rooms" isSecondary prefetch="render">
            View Rooms
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
