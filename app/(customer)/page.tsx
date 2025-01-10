import CategoryCard from "@/components/CategoryCard";

import "@/style/home.scss";
import Image from "next/image";
export default function Home() {
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
      <CategoryCard />
    </>
  );
}
