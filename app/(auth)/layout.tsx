import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: any) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    try {
      const user = JSON.parse(token);
      if (user.role === "admin") {
        redirect("/admin");
      } else {
        redirect("/employee");
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return <>{children}</>;
}
