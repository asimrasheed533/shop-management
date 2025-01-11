import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: any) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    const user = JSON.parse(token);

    if (user.role === "ADMIN") {
      return redirect("/admin");
    } else if (user.role === "EMPLOYEE") {
      return redirect("/employee");
    }
  }

  return <>{children}</>;
}
