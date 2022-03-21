export const labelClasses = `inline-block w-[150px] font-bold text-xl`;
export const LabelText: React.FC = ({ children }) => (
  <span className={labelClasses}>{children}</span>
);
