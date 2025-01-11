"use client";

import { useState } from "react";
import "@/style/input.scss";
import { IInput } from "@/interface";
export default function Input({
  label,
  id,
  type = "text",
  error,
  autoFocus = false,
  required = false,
  style,
  name,
  disabled = false,
  ...rest
}: IInput) {
  const [isFocused, setIsFocused] = useState(false);

  const [isSecure, setIsSecure] = useState(type === "password");

  return (
    <div className="container__main__content__details__main__input__login">
      <div className="container__input__field__wrapper__login">
        <input
          id={id}
          type={
            type === "password" && isSecure
              ? "password"
              : type === "password"
              ? "text"
              : type
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          autoFocus={autoFocus}
          className="container__main__input__login__field"
          style={style}
          {...rest}
          name={name}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`container__main__content__details__main__input__label__login ${
            isFocused ? "focused" : ""
          }`}
        >
          {label} {required && <span className="required">*</span>}
        </label>
        {type === "password" && (
          <button
            type="button"
            className="container__main__content__details__main__input__login__toggle"
            onClick={() => setIsSecure(!isSecure)}
          >
            {isSecure ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--blue)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--blue)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  fill="none"
                />
                <circle cx="12" cy="12" r="3" fill="none" />
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="container__main__content__details__main__input__error">
        {error}
      </div>
    </div>
  );
}
