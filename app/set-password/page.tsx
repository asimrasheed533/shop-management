"use client";
import { setPassword } from "@/actions";
import usePostAction from "@/hooks/usePostAction";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function page() {
  const { action, isPending } = usePostAction({
    action: setPassword,
    defaultState: { error: "" },
    onError() {
      toast.error("Account signIn failed");
    },
    onSuccess: () => {
      toast.success("LogIn successfully");
      redirect("/signIn");
    },
  });
  return (
    <>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Reset Password</h2>
        <form action={action}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Password:</label>
            <input
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
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
