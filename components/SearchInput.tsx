"use client";

import { useEffect, useRef, useState } from "react";
import "@/style/input.scss";
export default function SearchInput({
  value,
  onChange = () => {},
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`search__bar__wrapper ${isExpanded ? "expanded" : ""}`}>
        <button
          type="button"
          className="search__icon__button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.2207 13.441C3.78514 13.441 1.00037 10.6562 1.00037 7.22064C1.00037 3.78508 3.78514 1.00031 7.2207 1.00031C10.6563 1.00031 13.441 3.78508 13.441 7.22064C13.441 10.6562 10.6563 13.441 7.2207 13.441Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.9997 14.9997L11.8895 11.8895"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isExpanded && (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="search__input"
            placeholder="Search..."
          />
        )}
      </div>
    </>
  );
}
