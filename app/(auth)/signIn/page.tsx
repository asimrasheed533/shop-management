"use client";
import { useRouter } from "next/navigation";
import "@/style/auth.scss";
import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";
import loginImg from "@/public/loginImg.png";
import { toast } from "react-toastify";
import Image from "next/image";
import usePostAction from "@/hooks/usePostAction";
import Input from "@/components/Input";
import { signInAction } from "@/actions";

export default function SignIn() {
  const router = useRouter();
  const { action, isPending } = usePostAction({
    action: signInAction,
    defaultState: {
      emailError: null,
      passwordError: null,
    },
    onError: () => {
      toast.error("Account signIn failed");
    },
    onSuccess: () => {
      toast.success("LogIn successfully");
      router.refresh();
    },
  });
  return (
    <div className="create__container">
      <div className="create__container__img">
        <Image
          className="create__container__img__image"
          src={loginImg}
          alt="fast food"
        />
      </div>
      <form action={action} className="create__container__from__warper">
        <div className="create__container__from__heading">Welcome Back!</div>
        <div className="create__container__from__sub__heading">
          Don't have an account?{" "}
          <span>
            <Link href="/signUp" className="create__container__link">
              Sign Up
            </Link>
          </span>
        </div>
        <div className="input__row__login">
          <Input label="Email" type="email" name="email" />
        </div>
        <div className="input__row__login">
          <Input label="Password" type="password" name="password" />
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
  );
}
