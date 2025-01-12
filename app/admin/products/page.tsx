"use client";
import headerItems from "@/data/headerItems.json";
// import { products as data } from "@/data/mocks";

import ListingTable from "@/components/ListingTable";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ListingCheckbox from "@/components/ListingCheckbox";
import Image from "next/image";
import useGetAction from "@/hooks/useGetAction";
import { deleteProduct, getProducts } from "@/actions";
import usePostAction from "@/hooks/usePostAction";
import { toast } from "react-toastify";
export default function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(3);

  const { data, mutate } = useGetAction({
    key: "products",
    action: getProducts,
  });

  const { actionCallback } = usePostAction({
    action: deleteProduct,
    onSuccess: () => {
      toast.success("Order Placed successfully");
      router.refresh();
      mutate();
    },
  });
  return (
    <>
      <div className="listing__page">
        <div className="listing__page__header">
          <div className="listing__page__header__actions">
            <Link
              href={pathname + "/create"}
              className="listing__page__header__actions__button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00033 13.3307C7.57954 13.3307 7.23842 12.9896 7.23842 12.5688V8.7593H3.4289C3.00811 8.7593 2.66699 8.41818 2.66699 7.9974C2.66699 7.57661 3.00811 7.23549 3.4289 7.23549H7.23842V3.42597C7.23842 3.00518 7.57954 2.66406 8.00033 2.66406C8.42111 2.66406 8.76223 3.00518 8.76223 3.42597V7.23549H12.5718C12.9925 7.23549 13.3337 7.57661 13.3337 7.9974C13.3337 8.41818 12.9925 8.7593 12.5718 8.7593H8.76223V12.5688C8.76223 12.9896 8.42111 13.3307 8.00033 13.3307Z"
                  fill="currentColor"
                />
              </svg>
              Add Product
            </Link>
          </div>
        </div>
        <ListingTable
          data={[]}
          headerItems={headerItems.Products}
          selectedRows={selectedRows}
          totalPages={10}
        >
          {data?.products?.map((item) => (
            <div className="listing__page__table__content__row" key={item.id}>
              <button
                onClick={() => actionCallback(item.id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                className="listing__page__table__content__row__entry checkbox"
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
              </button>

              <div className="listing__page__table__content__row__entry">
                {item.title}
              </div>
              <div className="listing__page__table__content__row__entry">
                <Image
                  className="listing__page__table__content__row__entry__img"
                  src={item.image || "/avatar.png"}
                  width={120}
                  height={120}
                  alt="category"
                />
              </div>

              <div className="listing__page__table__content__row__entry">
                {item.price}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.createdAt.toLocaleDateString()}
              </div>
            </div>
          ))}
        </ListingTable>
      </div>
    </>
  );
}
