"use server";
import { cookies } from "next/headers";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import { baseURL } from "./config";

export async function setPassword(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      ...prevState,
      passwordError: "Passwords do not match",
      status: "error",
    };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: token },
    data: { password: hashedPassword },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}

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
    emailError: string | null;
    passwordError: string | null;
    status: string | null;
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
    select: {
      id: true,
      password: true,
      role: true,
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

  (await cookies()).set(
    "token",
    JSON.stringify({
      id: user.id,
      role: user.role,
    }),
    { path: "/" }
  );

  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}

export async function logout() {
  (await cookies()).set("token", "", { path: "/", expires: new Date(0) });
  return redirect("/signIn");
}
export async function createCustomer(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  if (email && phone && address) {
    return {
      ...prevState,
      error: "",
      status: "ok",
    };
  }
  await prisma.customer.create({
    data: {
      name,
      email,
      phone,
      address,
    },
  });
  return {
    ...prevState,
    error: "All fields are required",
    status: "error",
  };
}

export async function createProduct(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const categoryId = formData.get("categoryId") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  if (!title) {
    return {
      ...prevState,
      status: "error",
      error: "Product title is required",
    };
  }

  if (!categoryId) {
    return { ...prevState, status: "error", error: "Category ID is required" };
  }

  let pictureUrl = "";

  if (image && image.name !== "undefined") {
    const fileName = image.name;
    const filePath = `./public/uploads/${fileName}`;

    try {
      await fs.access("./public/uploads");
    } catch {
      await fs.mkdir("./public/uploads");
    }

    const fileBuffer = await image.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    pictureUrl = filePath.replace("./public", "");
  }

  await prisma.product.create({
    data: {
      title,
      price,
      description,
      image: pictureUrl,
      categoryId,
    },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}
export async function deleteCategory(
  prevState: {
    status: string | null;
    error: string;
  },
  categoryId: string
) {
  const existingCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!existingCategory) {
    return {
      ...prevState,
      status: "error",
      error: "Category Not Found",
    };
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
    message: "Category deleted successfully",
  };
}

export async function deleteProduct(
  prevState: {
    status: string | null;
    error: string;
  },
  productId: string
) {
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    return {
      ...prevState,
      status: "error",
      error: "Product Not Found",
    };
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
    message: "Product deleted successfully",
  };
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      image: true,
      createdAt: true,
    },
  });

  return products;
}

export async function createCategory(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  if (!name) {
    return { ...prevState, nameError: "Name is required", status: "error" };
  }

  let pictureUrl = "";

  if (image && image.name !== "undefined") {
    const fileName = image.name;
    const filePath = `./public/uploads/${fileName}`;

    try {
      await fs.access("./public/uploads");
    } catch {
      await fs.mkdir("./public/uploads");
    }

    const fileBuffer = await image.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    pictureUrl = filePath.replace("./public", "");
  }
  await prisma.category.create({
    data: {
      name,
      image: pictureUrl,
    },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}

export async function getCategoriesId() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return categories;
}

export async function getCategories() {
  const category = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
    },
  });

  return {
    category,
    status: "ok",
  };
}

export async function deleteEmployee(
  prevState: {
    status: string | null;
    error: string;
    message: string;
  },
  employeeId: string
) {
  const existingEmployee = await prisma.user.findUnique({
    where: {
      id: employeeId,
    },
  });

  if (!existingEmployee) {
    return {
      ...prevState,
      status: "error",
      error: "Employee Not Found",
    };
  }
  await prisma.user.delete({
    where: {
      id: employeeId,
    },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}

export async function getEmployee() {
  const employee = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      salary: true,
      status: true,
      createdAt: true,
    },
  });

  return {
    employee,
    status: "ok",
  };
}

export async function createEmployee(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const salary = Number(formData.get("salary"));
  const status = formData.get("status") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email || !salary || !status) {
    return {
      ...prevState,
      error: "All fields are required",
      status: "error",
    };
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      salary,
      phone,
      status,
      startedAt: new Date(),
      password: "",
      role: "EMPLOYEE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "asimrasheed442@gmail.com",
      pass: "jlwxruzmsqfozshx",
    },
  });

  const resetLink = `${baseURL}/set-password?token=${user.id}`;

  await transporter.sendMail({
    from: "devscot@gmail.com",
    to: email,
    subject: "Set Up Your Password",
    html: `<p>Hi ${name},</p>
           <p>Please set up your password by clicking the link below:</p>
           <a href="${resetLink}">Set Password</a>
           <p>If you did not expect this email, please ignore it.</p>`,
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
  };
}

export async function getSalaries(
  prevState: {
    status: string | null;
    error: string;
  },
  formData: FormData
) {
  const { month, year } = Object.fromEntries(formData.entries());
  const parsedMonth = parseInt(month as string, 10);
  const parsedYear = parseInt(year as string, 10);

  if (!parsedMonth || !parsedYear) {
    return {
      ...prevState,
      status: "error",
      error: "Month and year are required.",
    };
  }

  const employees = await prisma.user.findMany({
    include: {
      salaries: {
        where: {
          month: parsedMonth,
          year: parsedYear,
        },
        select: {
          id: true,
          amount: true,
          paymentDate: true,
        },
      },
    },
  });

  return {
    ...prevState,
    status: "ok",
    error: "",
    data: employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      salary: employee.salaries[0]?.amount || "Not Approved",
      salaryId: employee.salaries[0]?.id || null,
    })),
  };
}
export async function approveSalaries(
  prevState: {
    status: string | null;
    error: string;
  },
  selectedIds: string[]
) {
  await prisma.salary.updateMany({
    where: {
      id: {
        in: selectedIds,
      },
    },
    data: {
      paymentDate: new Date(),
    },
  });
  return { ...prevState, status: "ok", error: "" };
}

export async function saveCart(
  cart: Record<string, number>,
  prevState: {
    status: string | null;
    error: string;
  }
) {
  const totalProducts = Object.keys(cart).length;
  const cookieStore = await cookies();
  cookieStore.set(
    "cart",
    JSON.stringify({
      totalProducts,
    })
  );
  return {
    ...prevState,
    status: "error",
    error: "Failed to save cart. Please try again.",
  };
}
