"use client";

import { getProducts, saveCart } from "@/actions";
import PageBanner from "@/components/PageBanner";
import useGetAction from "@/hooks/useGetAction";
import usePostAction from "@/hooks/usePostAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Products() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});

  const { data: products, isLoading } = useGetAction({
    key: "products",
    action: getProducts,
  });

  // const { actionCallback, isPending } = usePostAction({
  //   action: saveCart,
  //   defaultState: { error: "" },
  //   onError: () => {
  //     toast.error("Failed to add product to cart.");
  //   },
  //   onSuccess: () => {
  //     toast.success("Product added to cart!");
  //   },
  // });
  return (
    <>
      <PageBanner title="Products" />
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "30px",
          color: "#333",
        }}
      >
        Our Products
      </h2>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#555",
            }}
          >
            Loading products...
          </p>
        </div>
      ) : (
        <div
          className="products__warper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          {products?.map((product) => (
            <ProductsItem
              key={product.id}
              image={product.image ?? "/defaultImage.png"}
              name={product.title ?? "Untitled"}
              price={product.price}
            />
          ))}
        </div>
      )}
    </>
  );
}

function ProductsItem({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: number;
}) {
  return (
    <div className="category__item">
      <Image
        className="category__item__image"
        src={image}
        alt="category"
        width={200}
        height={150}
      />
      <div className="category__item__name">{name}</div>
      <div
        style={{
          marginTop: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
        }}
        className="product__price"
      >
        Rs:/{price}
      </div>
      <button
        style={{
          marginTop: "10px",
          backgroundColor: "#ffff",
          color: "#000",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        className="add__to__cart"
      >
        Add to Cart
      </button>
    </div>
  );
}
