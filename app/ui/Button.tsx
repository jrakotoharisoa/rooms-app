import { LinkProps } from "@remix-run/react";
import { Link } from "react-router-dom";

export const btnClass =
  "inline-block my-3 h-[35px] rounded-full flex items-center px-4 font-medium transition duration-300 ease-out hover:ease-in leading-4";

const getClassFor = (isSecondary?: boolean) => {
  if (isSecondary) {
    return "border border-white text-white hover:bg-white hover:text-darker";
  } else {
    return "bg-secondary text-dark";
  }
};

export const LinkButton: React.FC<
  LinkProps & {
    isSecondary?: boolean;
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = "", isSecondary, children, ...props }) => {
  return (
    <Link
      {...props}
      className={`${btnClass} ${className} ${getClassFor(isSecondary)}`}
    >
      {children}
    </Link>
  );
};

export const Button: React.FC<
  { isSecondary?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = "", isSecondary, ...props }) => {
  return (
    <button
      {...props}
      className={`${btnClass} ${className} ${getClassFor(isSecondary)}`}
    />
  );
};
