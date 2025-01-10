import Image from "next/image";
import React from "react";
import "@/style/home.scss";
export default function PageBanner({ title }: { title: string }) {
  return (
    <>
      <div className="banner__page__container">
        <Image
          className="banner__page__container__overlay__img"
          width={2000}
          height={600}
          src="/pageBanner.webp"
          alt="food"
        />

        <div className="banner__page__container__text">{title}</div>
      </div>
    </>
  );
}
