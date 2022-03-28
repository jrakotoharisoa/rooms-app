import cometLieu from "./comet-lieu.jpg";
import me from "./me.jpeg";
import github from "./github.png";
import twitter from "./twitter.png";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Johann R.",
  };
};

export const Me: React.FC = () => {
  return (
    <div className="relative  h-full w-full ">
      <img
        className="absolute h-full w-full object-cover"
        style={{ zIndex: -1 }}
        src={cometLieu}
        alt="comet"
      />
      <div className="mx-60 my-10 inline-block">
        <div className="flex items-center space-y-3 rounded bg-white p-5 text-center text-dark ">
          <img src={me} alt="me" className="h-32 rounded-full" />
          <div className="space-y-3 p-3">
            <div className="text-3xl font-bold">Johann R. x Comet Meetings</div>
            <div className="flex space-x-5">
              <div className="flex items-center space-x-3 text-xl">
                <img src={twitter} className="h-6" alt="twitter" />
                <span>@Joha2n</span>
              </div>
              <div className="flex items-center space-x-3 text-xl">
                <img src={github} className="h-6" alt="github" />
                <span>github.com/jrakotoharisoa</span>
              </div>
            </div>
          </div>
          {/* <pre className="p-3">
            {`
const me = {
  name: 'Johann Rakotoharisoa',
  job: 'Software engineer',
  company: 'Comet Meetings',
  twitter: '@Joha2n',
  github: 'github.com/jrakotoharisoa',
};
      `}
          </pre> */}
        </div>
      </div>
    </div>
  );
};
