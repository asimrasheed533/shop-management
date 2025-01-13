"use client";

import headerItems from "@/data/headerItems.json";
import ListingTable from "@/components/ListingTable";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useGetAction from "@/hooks/useGetAction";
import usePostAction from "@/hooks/usePostAction";
import { toast } from "react-toastify";
import { approveSalaries, getEmployee } from "@/actions";

export default function Salary() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { data, mutate } = useGetAction({
    key: "employees",
    action: getEmployee,
  });

  const { action, isPending } = usePostAction({
    action: approveSalaries,
    defaultState: { error: "" },
    onError: () => {
      toast.error("Failed to approve salaries!");
    },
    onSuccess: () => {
      toast.success("LSalaries approved successfully");
      mutate();
    },
  });

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : null;
    setSelectedMonth(value);
    mutate();
  };

  return (
    <div className="listing__page">
      <div className="listing__page__header">
        <div className="listing__page__header__actions">
          <button
            // onClick={}
            className="listing__page__header__actions__button"
          >
            Approve
          </button>
        </div>
        <label>
          Month:
          <select name="month" onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ListingTable
        data={data?.employee || []}
        headerItems={headerItems.Employees}
        selectedRows={selectedRows}
        totalPages={10}
      >
        {data?.employee?.map((item) => (
          <div className="listing__page__table__content__row" key={item.id}>
            <div className="listing__page__table__content__row__entry checkbox">
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => {
                  setSelectedRows((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id]
                  );
                }}
              />
            </div>
            <div className="listing__page__table__content__row__entry">
              {item.name}
            </div>
            <div
              className="listing__page__table__content__row__entry"
              style={{
                width: "300px",
              }}
            >
              {item.email}
            </div>
            <div className="listing__page__table__content__row__entry">
              {item.phone}
            </div>
            <div className="listing__page__table__content__row__entry">
              {item.salary}
            </div>
          </div>
        ))}
      </ListingTable>
    </div>
  );
}
