import cometLieu from "./comet-lieu.jpg";
import me from "./me.jpeg";
export const Me: React.FC = () => {
  return (
    <div className="relative h-full w-full">
      <img
        className="absolute h-full w-full object-cover"
        style={{ zIndex: -1 }}
        src={cometLieu}
        alt="comet"
      />
      <div className="m-5 inline-block">
        <div className="flex items-center  space-x-3 overflow-hidden rounded-r-sm rounded-l-full bg-dark text-white">
          <img src={me} alt="me" className=" rounded-full" />
          <pre className="p-3">
            {`
const me = {
  name: 'Johann Rakotoharisoa',
  job: 'Software engineer',
  company: 'Comet Meetings',
  twitter: '@Joha2n',
  github: 'github.com/jrakotoharisoa',
};
      `}
          </pre>
        </div>
      </div>
    </div>
  );
};
