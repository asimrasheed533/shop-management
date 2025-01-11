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
    </div>
  );
};

export default ListingHeaderEntry;
