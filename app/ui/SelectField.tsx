import React from "react";
import { FieldContainer } from "./FieldContainer";
import { LabelText } from "./LabelText";

export const SelectField: React.FC<
  {
    label: string;
    options: { value: string; label: string }[];
  } & React.InputHTMLAttributes<HTMLSelectElement>
> = ({ label, options, ...selectProps }) => {
  return (
    <FieldContainer>
      <LabelText>{label}</LabelText>
      <select
        className="ml-1 grow border-b  border-dark px-2 py-1 outline-0 focus:border-primary"
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldContainer>
  );
};
