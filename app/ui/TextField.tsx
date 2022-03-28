import React from "react";
import { FieldContainer } from "./FieldContainer";
import { LabelText } from "./LabelText";

export const TextField: React.FC<
  { label: string } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, ...inputProps }) => {
  return (
    <FieldContainer>
      <LabelText>{label}</LabelText>
      <input
        className="ml-1 flex-1 rounded-none border-b  border-dark px-2 py-1 outline-0 focus:border-primary"
        {...inputProps}
      />
    </FieldContainer>
  );
};
