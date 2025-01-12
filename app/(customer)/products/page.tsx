"use client";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { useRouter } from "next/navigation";
const products = [
  { id: 1, image: "/logoMe.png", title: "Product 1", price: 200 },
  { id: 2, image: "/logoMe.png", title: "Product 2", price: 300 },
  { id: 3, image: "/logoMe.png", title: "Product 3", price: 400 },
];
export default function Products() {
  // const { data } = useGetAction({
  //   key: "products",
  //   action: getProducts,
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
        {products.map((product) => (
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
    <button onClick={() => router.push("/products")} className="category__item">
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
    </button>
  );
}
