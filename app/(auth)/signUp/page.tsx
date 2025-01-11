"use client";
import "@/style/auth.scss";

import { useRouter } from "next/navigation";
import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";
import loginImg from "@/public/loginImg.png";
import { toast } from "react-toastify";
import Image from "next/image";
import usePostAction from "@/hooks/usePostAction";
import Input from "@/components/Input";
import { register } from "@/actions";
import { useState } from "react";
export default function SignUp() {
  const [role, setRole] = useState<"ADMIN" | "EMPLOYEE">("EMPLOYEE");
  const router = useRouter();
  const { action, isPending, data } = usePostAction({
    action: register,
    defaultState: { error: "" },
    onError() {
      toast.error("Account creation failed");
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/signIn");
    },
  });

  return (
    <>
      <div className="create__container">
        <div className="create__container__img">
          <Image
            width={1000}
            height={100}
            className="create__container__img__image"
            src={loginImg}
            alt="fast food"
          />
        </div>
        <form action={action} className="create__container__from__warper">
          <div className="create__container__from__heading">Welcome Back!</div>
          <div className="create__container__from__sub__heading">
            Already have an account?
            <span>
              <Link href="/signIn" className="create__container__link">
                Sign In
              </Link>
            </span>
          </div>
          <div className="input__row__login">
            <Input label="Full Name" type="text" name="name" />
          </div>
          <div className="input__row__login">
            <Input label="Email" type="text" name="email" />
          </div>
          <div className="input__row__login">
            <select
              name="role"
              style={{
                width: "100%",
                height: "40px",
                padding: "0 15px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                borderColor: "#ccc",
              }}
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="input__row__login">
            <Input label="Password" type="password" name="password" />
          </div>
          <div className="input__row__login">
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
            />
          </div>
          <div
            style={{
              marginBottom: "20px",
            }}
            className="signin__submit__warper"
          >
            <button
              disabled={isPending}
              type="submit"
              className="signin__submit__button"
            >
              {isPending ? <MoonLoader color="#fff" size={16} /> : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
