"use client";
import { setPassword } from "@/actions";
import usePostAction from "@/hooks/usePostAction";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { toast } from "react-toastify";

export default function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

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
  if (!token) {
    toast.error("Token is missing. Please try again.");
    return null;
  }
  console.log("token", token);
  return (
    <>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "20px" }}>
            <MoonLoader size={32} color="#0070f3" />
          </div>
        }
      >
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
            <input name="userId" type="hidden" value={token ?? ""} />

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
              {isPending ? (
                <MoonLoader color="#fff" size={16} />
              ) : (
                "Set Password"
              )}
            </button>
          </form>
        </div>
      </Suspense>
    </>
  );
}
