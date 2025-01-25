import ReactSelect from "react-select";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const flavourOptions = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
];
const groupedOptions = [
  {
    label: "Colours",
    options: colourOptions,
  },
  {
    label: "Flavours",
    options: flavourOptions,
  },
];

interface SelectProps {
  className?: string;
  options?: any[];
  label?: string;
  name?: string;
  error?: string;
  isMulti?: boolean;
}

export default function Select({
  className,
  options = [],
  label,
  name,
  error,
  isMulti = false,
  ...props
}: SelectProps) {
  return (
    <div className="react__select__container">
      <div className="react__select">
        <label htmlFor="" className="react__select__label">
          {label}
        </label>
        <ReactSelect
          classNamePrefix="react__select"
          options={groupedOptions}
          styles={{
            option(base, state) {
              return {
                ...base,
                color: "var(--text__primary)",
                fontSize: "14px",
                borderRadius: "10px",
              };
            },
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "var(--select__option__bg)",
              primary25: "var(--select__option__bg)",
              primary50: "var(--select__option__bg)",
              primary75: "var(--select__option__bg)",
            },
          })}
          isMulti={isMulti}
          {...props}
        />
      </div>
      {error && <div className="react__select__container__error">{error}</div>}
    </div>
  );
}
