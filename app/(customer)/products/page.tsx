"use client";
import { getProducts } from "@/actions";
import PageBanner from "@/components/PageBanner";
import useGetAction from "@/hooks/useGetAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity?: number;
};
export default function Products() {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);
  const { data: products } = useGetAction({
    key: "products",
    action: getProducts,
  });
  const handleAddToCart = (product: Product): void => {
    setCart((prev) => {
      const isProductInCart = prev.find((item) => item.id === product.id);
      if (isProductInCart) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Navigate to Cart Page
  const goToCart = (): void => {
    router.push("/cart");
  };

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
        {products?.products?.map((product) => (
          <ProductsItem
            key={product.id}
            image={product.image ?? "/defaultImage.png"}
            name={product.title ?? "Untitled"}
            price={product.price}
          />
        ))}
      </div>
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
  const router = useRouter();
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
