"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const NAV_LINKS = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Banner Picture",
    href: "/dashboard/banner",
  },
];

const DashboardNavigation: React.FC<Props> = ({}) => {
  const pathname = usePathname();
  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "block py-2 px-4 rounded-md",
            link.href === pathname
              ? "bg-gray-200 text-foreground"
              : "hover:bg-gray-100 hover:text-foreground text-muted-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardNavigation;
