"use client";
import PageBanner from "@/components/PageBanner";
import React from "react";
import "@/style/home.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  return (
    <>
      <PageBanner title="Cart" />
      <h1
        style={{
          textAlign: "center",
          margin: "20px",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#333",
          border: "1px solid #ddd",
          padding: "10px",
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        Cart
      </h1>
      <div className="cart__warper">
        <CartItem img="/logoMe.png" name="Product 1" price={999} />
        <CartItem img="/logoMe.png" name="Product 1" price={999} />
        <CartItem img="/logoMe.png" name="Product 1" price={999} />
        <CartItem img="/logoMe.png" name="Product 1" price={999} />
      </div>
      <div className="checkout">
        <button
          onClick={() => router.push("/checkout")}
          className="checkout__heading"
        >
          Checkout
        </button>
        <div className="checkout__total__price">
          <div className="checkout__total__price__heading">Total Price</div>
          <div className="checkout__total__price__value">Rs: 3997</div>
        </div>
      </div>
    </>
  );
}

function CartItem({
  img,
  name,
  price,
}: {
  img: string;
  name: string;
  price: number;
}) {
  return (
    <div className="cart__container__left__item">
      <div className="cart__container__left__item__col">
        <div className="cart__container__left__col__img">
          <Image width={150} height={150} src={img} alt="cart" />
        </div>
        <div className="cart__container__left__col__content">
          <div className="cart__container__left__name__warper">
            <div className="cart__container__left__col__name">{name}</div>
          </div>

          <div className="cart__item__price">
            <div className="cart__item__Heading">Item Price</div>
            <div className="cart__item__total__price">Rs: {price}</div>
          </div>
        </div>
      </div>
      <div
        // onClick={() => dispatch(removeToCart(cart))}
        className="remove__item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
    </div>
  );
}
