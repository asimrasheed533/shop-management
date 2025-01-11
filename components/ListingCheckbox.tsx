"use client";

interface ListingCheckboxProps {
  checked: boolean;
  partiallyChecked?: boolean;
  onClick: () => void;
}

const ListingCheckbox: React.FC<ListingCheckboxProps> = ({
  checked,
  partiallyChecked = false,
  onClick,
}) => {
  return (
    <button
      className={`listing__checkbox ${
        partiallyChecked || checked ? "checked" : ""
      }`}
      type="button"
      onClick={(e) => {
        e.preventDefault(); // Prevent default button behavior
        e.stopPropagation(); // Prevent event bubbling
        onClick(); // Call the onClick handler
      }}
    >
      {partiallyChecked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-dash"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5z" />
        </svg>
      ) : checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <path d="M10.854 5.646a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L6.5 9.793l3.646-3.647a.5.5 0 0 1 .708 0z" />
        </svg>
      ) : null}
    </button>
  );
};

export default ListingCheckbox;
