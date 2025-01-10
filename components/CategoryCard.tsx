"use client";
import "@/style/home.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryCard({}) {
  return (
    <div className="category__container">
      <h2>Shop By Category</h2>
      <div className="category__items__warper">
        <CategoryItem image="/logoMe.png" name="Category 1" />
      </div>
    </div>
  );
}

function CategoryItem({ image, name }: { image: string; name: string }) {
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
    </button>
  );
}
