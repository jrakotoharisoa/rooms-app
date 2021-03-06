export const fieldContainerClasses = `flex space-x-3 text-xl`;
export const FieldContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <label className={`${fieldContainerClasses}`}>{children}</label>;
};
