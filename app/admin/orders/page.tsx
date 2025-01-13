"use client";
import headerItems from "@/data/headerItems.json";
import ListingTable from "@/components/ListingTable";
import { Order as data } from "@/data/mocks";

import React, { useState } from "react";
import ListingCheckbox from "@/components/ListingCheckbox";
import Image from "next/image";
import useGetAction from "@/hooks/useGetAction";
export default function Orders() {
  const [selectedRows, setSelectedRows] = useState([]);

  // const { data } = useGetAction({
  //   key: "orders",
  //   action: getOrder,
  // });
  return (
    <>
      <div className="listing__page">
        <ListingTable
          data={[]}
          headerItems={headerItems.Orders}
          selectedRows={selectedRows}
        >
          {data?.map((item) => (
            <div className="listing__page__table__content__row" key={item.id}>
              <div className="listing__page__table__content__row__entry checkbox">
                <ListingCheckbox
                  partiallyChecked={false}
                  checked={false}
                  onClick={() => {}}
                />
              </div>

              <div className="listing__page__table__content__row__entry">
                {item.id}
              </div>
              <div className="listing__page__table__content__row__entry">
                <Image
                  className="listing__page__table__content__row__entry__img"
                  src="/avatar.png"
                  width={120}
                  height={120}
                  alt="category"
                />
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.name}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.email}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.phone}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.createdAt}
              </div>
            </div>
          ))}
        </ListingTable>
      </div>
    </>
  );
}
