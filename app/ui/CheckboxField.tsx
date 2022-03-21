import React from "react";
import { fieldContainerClasses } from "./FieldContainer";
import { LabelText } from "./LabelText";

export const CheckboxField: React.FC<
  {
    label: string;
    choices: { value: string; label: string; defaultChecked: boolean }[];
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, choices: options, name }) => {
  return (
    <div className={fieldContainerClasses}>
      <LabelText>{label}</LabelText>
      <div className="grow">
        {options.map((option) => (
          <label className="block" key={option.value}>
            <input
              key={option.value}
              name={`${name}[]`}
              value={option.value}
              type="checkbox"
              defaultChecked={option.defaultChecked}
            />{" "}
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};
