import { CSSProperties, ReactNode } from "react";

export interface IListingTable {
  style?: Object;
  children: ReactNode;
  selectedRows?: string[];
  setSelectedRows?: (value: string[]) => void;
  totalPages?: number;
  sortData?: {
    key: string;
    order: "asc" | "desc";
  };
  setSortData?: (value: { key: string; order: "asc" | "desc" }) => void;
  headerItems: {
    key: string;
    name: string;
    hasImage?: boolean;
    style?: CSSProperties;
  }[];
  data: any[];
  onAdd?: () => void;
  isFetchingData?: boolean;
  isStale?: boolean;
  noCheckbox?: boolean;
}

export interface IDashboardLayout {
  children: ReactNode;
  links: ILinks[];
}
export interface ILinks {
  label: string;
  children: {
    href: string;
    label: string;
    icon: ReactNode;
    preloadLink?: string;
  }[];
}

export interface IInput {
  name: string;
  label: string;
  id?: string;
  value?: string;
  type?: string;
  error?: string;
  onChange?: (e: any) => void;
  autoFocus?: boolean;
  required?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}