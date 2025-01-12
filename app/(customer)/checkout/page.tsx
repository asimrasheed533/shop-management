"use client";
import { createCustomer } from "@/actions";
import usePostAction from "@/hooks/usePostAction";
import "@/style/home.scss";
import { useRouter } from "next/navigation";
import MoonLoader from "react-spinners/MoonLoader";
import { toast } from "react-toastify";
export default function Checkout() {
  const router = useRouter();
  const { action, isPending } = usePostAction({
    action: createCustomer,
    defaultState: { error: "" },
    onError() {
      toast.error("Account creation failed");
    },
    onSuccess: () => {
      toast.success("Order Placed successfully");
      router.push("/");
    },
  });
  return (
    <>
      <div className="checkout__container">
        <div className="checkout__container__heading">Checkout</div>

        <form action={action} className="checkout__content__warper__from">
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Name</div>
            <input
              name="name"
              className="checkout__input__entry__name"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Email</div>
            <input
              name="email"
              className="checkout__input__entry__name"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Phone Number</div>
            <input
              name="phone"
              className="checkout__input__entry__name"
              type="tel"
              required
              placeholder="Phone Number"
            />
          </div>
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Address</div>
            <input
              name="address"
              className="checkout__input__entry__name"
              type="text"
              required
              placeholder="Address"
            />
          </div>

          <button className="checkout__btn">
            {isPending ? <MoonLoader size={15} color="#000" /> : "isPending"}
          </button>
        </form>
      </div>
    </>
  );
}
