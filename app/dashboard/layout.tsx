import HeaderBar from "@/components/commons/HeaderBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { isManager } from "../_actions/isManager";

const DashboardLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !(await isManager())) {
    return redirect("/");
  }
  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeaderBar />
      <main className="my-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
