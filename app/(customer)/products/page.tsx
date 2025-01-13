"use client";

import { getProducts } from "@/actions";
import PageBanner from "@/components/PageBanner";
import useGetAction from "@/hooks/useGetAction";
import Image from "next/image";

// const cart = JSON.stringify({
//   "23232": 2,
//   "34343": 1,
// });

// const addToCart = () => {
//   const newCart = {
//     ...JSON.parse(cart),
//     "45454": 3,
//   };
// };

// const updateCart = (id, action) => {
//   const newCart = JSON.parse(cart);

//   if (action === "decrease") {
//     newCart[id]--;
//   } else if (action === "increase") {
//     newCart[id]++;
//   }
// };

// const removeFromCart = (id) => {
//   const newCart = JSON.parse(cart);
//   delete newCart[id];
// };

// const products = Object.keys(cart).map()

// const productCount=(id)=>{
//   return cart[id];
// }

export default function Products() {
  const { data: products, isLoading } = useGetAction({
    key: "products",
    action: getProducts,
  });

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
