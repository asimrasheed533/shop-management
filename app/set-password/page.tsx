"use client";
import { setPassword } from "@/actions";
import usePostAction from "@/hooks/usePostAction";
import { redirect, useParams } from "next/navigation";
import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { toast } from "react-toastify";

export default function page() {
  const { userId } = useParams<{ userId: string }>();

  const { action, isPending } = usePostAction({
    action: setPassword,
    defaultState: { error: "" },
    onError() {
      toast.error("Account set-password failed");
    },
    onSuccess: () => {
      toast.success("set-password successfully");
      redirect("/signIn");
    },
  });

  console.log("userid", userId);
  return (
    <>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Reset Password</h2>
        <form action={action}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              id="password"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </div>
          <input name="userId" type="hidden" value={userId} />

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#0070f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isPending ? <MoonLoader color="#fff" size={16} /> : "Set Password"}
          </button>
        </form>
      </div>
    </>
  );
}
