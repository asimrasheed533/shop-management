"use client";
import { useState } from "react";
import { getCategories, getProducts } from "@/actions";
import useGetAction from "@/hooks/useGetAction";

import "@/style/home.scss";
import Image from "next/image";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products, isLoading: loadingProducts } = useGetAction({
    key: "products",
    action: getProducts,
  });

  const { data: categories, isLoading: loadingCategories } = useGetAction({
    key: "category",
    action: getCategories,
  });
  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.id === selectedCategory)
    : products;

  return (
    <>
      <div className="banner__main">
        <Image
          className="banner__image"
          src="/bannerImg.png"
          alt="banner"
          width={1920}
          height={420}
        />
      </div>
      <h2
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          fontSize: "24px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          color: "#555",
        }}
      >
        Shop By Category
      </h2>
      {loadingCategories ? (
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
            Loading categories...
          </p>
        </div>
      ) : (
        <div
          className="categories__warper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {categories?.category?.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                backgroundColor:
                  selectedCategory === category.id ? "#007bff" : "#f0f0f0",
                color: selectedCategory === category.id ? "#fff" : "#555",
                border: "none",
                cursor: "pointer",
              }}
            >
              {category.name ?? "Untitled"}
            </button>
          ))}
        </div>
      )}

      {loadingProducts ? (
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
          {filteredProducts?.map((product) => (
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

function CategoryItem({ name }: { name: string }) {
  return (
    <button className="category__item">
      <div className="category__item__name">{name}</div>
    </button>
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
