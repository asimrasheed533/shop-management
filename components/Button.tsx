import { ButtonHTMLAttributes } from "react";
import { ClipLoader } from "react-spinners";
import Ripples from "./Ripples";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  isPending?: boolean;
  parentClassName?: string;
}

export default function Button({
  variant,
  parentClassName,
  ...props
}: ButtonProps) {
  return (
    <Ripples>
      <button
        {...props}
        className="button__primary"
        disabled={props.disabled || props.isPending}
      >
        {props.isPending && <ClipLoader color="currentColor" size={20} />}
        {props.children}
      </button>
    </Ripples>
  );
}
