import React, { CSSProperties, ReactNode } from "react";
import "@/style/listing.scss";
interface SortData {
  key: string;
  order: "asc" | "desc";
}

interface ListingHeaderEntryProps {
  className?: string;
  children?: ReactNode;
  sortKey?: string;
  sortData?: SortData;
  onSort?: (data: SortData) => void;
  style?: CSSProperties;
  hasImage?: boolean;
}

const ListingHeaderEntry: React.FC<ListingHeaderEntryProps> = ({
  className = "",
  children,
  sortKey,
  sortData,
  onSort,
  style,
  hasImage = false,
}) => {
  return (
    <div
      style={style}
      className={
        "listing__page__table__header__entry " +
        (hasImage ? "has__image " : "") +
        className
      }
    >
      {children}
      {sortKey && (
        <button
          onClick={() => {
            if (onSort) {
              onSort({
                key: sortKey,
                order: sortData?.order === "asc" ? "desc" : "asc",
              });
            }
          }}
          className="listing__page__table__header__entry__sort"
        >
          {sortData?.key === sortKey ? (
            sortData.order === "asc" ? (
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
                className="feather feather-chevrons-up"
              >
                <polyline points="17 11 12 6 7 11"></polyline>
                <polyline points="17 18 12 13 7 18"></polyline>
              </svg>
            ) : (
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
                className="feather feather-chevrons-down"
              >
                <polyline points="7 13 12 18 17 13"></polyline>
                <polyline points="7 6 12 11 17 6"></polyline>
              </svg>
            )
          ) : (
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
              className="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default ListingHeaderEntry;
