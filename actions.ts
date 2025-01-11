"use server";
import { cookies } from "next/headers";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
export async function register(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const role = (formData.get("role") as string) || "EMPLOYEE";

  if (!name) {
    return { ...prevState, nameError: "Name is required", status: "error" };
  }

  if (!email) {
    return { ...prevState, emailError: "Email is required", status: "error" };
  }

  if (!password) {
    return {
      ...prevState,
      passwordError: "Password is required",
      status: "error",
    };
  }
  if (password !== confirmPassword) {
    return {
      ...prevState,
      passwordError: "Passwords do not match",
      status: "error",
    };
  }

  if (!["ADMIN", "EMPLOYEE"].includes(role)) {
    return {
      ...prevState,
      roleError: "Invalid role",
      status: "error",
    };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role as "ADMIN" | "EMPLOYEE",
      startedAt: new Date(),
      salary: 50000,
      status: "Active",
    },
  });

  return {
    status: "ok",
    error: "",
    name: "",
    email: "",
    password: "",
    role: "",
  };
}

export async function signInAction(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const email = formData.get("email") as string;
  if (!email) {
    return { ...prevState, emailError: "Email is required", status: "error" };
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return { ...prevState, emailError: "User not found", status: "error" };
  }
  const password = formData.get("password") as string;

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      ...prevState,
      passwordError: "Password is incorrect",
      status: "error",
    };
  }

  (await cookies()).set("token", user.id, { path: "/admin" });
  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}
