import type { MetaFunction } from "remix";
import { LinkButton } from "~/ui/Button";
import { Heading } from "~/ui/Heading";

export const meta: MetaFunction = () => {
  return {
    title: "Devoxx 2022 - Demo",
  };
};

export default function Index() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-5">
        <Heading>Hi, DEVOXX !</Heading>
        <div className="flex space-x-5">
          <LinkButton to="/me" isSecondary prefetch="render">
            Show Me
          </LinkButton>
          <LinkButton to="/rooms" isSecondary prefetch="render">
            View Rooms
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
