"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const NAV_LINKS = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Men",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Women",
    href: "/products/women",
  },
  {
    id: 4,
    name: "Kids",
    href: "/products/kids",
  },
];

const NavbarLinks: React.FC<Props> = ({}) => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center gap-x-2 ml-5">
      {NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.id}
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
    </div>
  );
};

export default NavbarLinks;
