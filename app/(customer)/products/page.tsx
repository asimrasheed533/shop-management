"use client";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Products() {
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
          justifyContent: "space-around",
          gap: "20px",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <ProductsItem image="/logoMe.png" name="Product 1" price={200} />
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
    <button onClick={() => router.push("/products")} className="category__item">
      <Image
        className="category__item__image"
        src={image}
        alt="category"
        width={150}
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
    </button>
  );
}
