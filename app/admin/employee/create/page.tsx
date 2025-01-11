"use client";
import "@/style/dashboard.scss";
import Input from "@/components/Input";
import usePostAction from "@/hooks/usePostAction";
import { createEmployee } from "@/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();
  const { action, isPending } = usePostAction({
    action: createEmployee,
    defaultState: { error: "" },
    onSuccess: () => {
      toast.success("Employee added successfully!");
      setTimeout(() => {
        router.back();
      }, 1500);
    },
  });

  return (
    <>
      <div className="product__container">
        <form
          action={action}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <button
            type="submit"
            disabled={isPending}
            className="listing__page__header__actions__button"
          >
            {isPending ? "Loading..." : "Save"}
          </button>
          <div className="input__row">
            <Input label="Employee Name" type="text" name="name" />
            <Input label="Employee Email" type="text" name="email" />
          </div>
          <div className="input__row">
            <select
              name="status"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                backgroundColor: "white",
                outline: "none",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                appearance: "none",
                marginBottom: "12px",
              }}
            >
              <option value="status" disabled>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="deactive">DeActive</option>
            </select>
            <Input label="Salary" type="number" name="salary" required />
          </div>
          <div className="input__row">
            <Input label="Phone" type="text" name="phone" />
          </div>
        </form>
      </div>
    </>
  );
}
