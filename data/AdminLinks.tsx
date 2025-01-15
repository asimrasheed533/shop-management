import GeneralIcon from "@/icons/GeneralIcon";

export default [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <GeneralIcon />,
    children: [
      {
        href: "/admin/products",
        label: "Products",
        icon: <GeneralIcon />,
      },
      {
        href: "/admin/categories",
        label: "Categories",
        icon: <GeneralIcon />,
      },
      {
        href: "/admin/orders",
        label: "Orders",
        icon: <GeneralIcon />,
      },
    ],
  },
  {
    label: "Employee",
    href: "",
    icon: <GeneralIcon />,
    children: [
      {
        href: "/admin/employee",
        label: "Employees",
        icon: <GeneralIcon />,
      },
      {
        href: "/admin/salary",
        label: "Salary",
        icon: <GeneralIcon />,
      },
    ],
  },
];
