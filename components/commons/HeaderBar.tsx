import React from "react";
import DashboardNavigation from "../dashboard/DashboardNavigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import UserButton from "./UserButton";

type Props = {};

const HeaderBar: React.FC<Props> = ({}) => {
  return (
    <header className="sticky flex top-0 h-16 items-center justify-between gap-4 border-b bg-white">
      <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text:sm lg:gap-6">
        <DashboardNavigation />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="shrink-0 md:hidden"
            variant={"outline"}
            size={"icon"}
          >
            <MenuIcon className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <VisuallyHidden.VisuallyHidden asChild>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </VisuallyHidden.VisuallyHidden>
          <nav className="flex flex-col mt-5 gap-6 text-lg font-medium">
            <DashboardNavigation />
          </nav>
        </SheetContent>
      </Sheet>
      <UserButton />
    </header>
  );
};

export default HeaderBar;
