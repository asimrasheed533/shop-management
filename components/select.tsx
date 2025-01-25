"uae client";
import { useState } from "react";
import ReactSelect from "react-select";
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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className="react__select__container">
      <div className="react__select">
        <label htmlFor="" className="react__select__label">
          {label}
        </label>
        <ReactSelect
          classNamePrefix="react__select"
          options={options}
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
