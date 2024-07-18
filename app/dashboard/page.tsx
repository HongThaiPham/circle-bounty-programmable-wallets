import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentSalesCard from "@/components/dashboard/RecentSalesCard";
import RecentTransactionsCard from "@/components/dashboard/RecentTransactionsCard";
import React from "react";

type Props = {};

const DashboardPage: React.FC<Props> = ({}) => {
  return (
    <>
      <DashboardStats />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <RecentTransactionsCard />
        <RecentSalesCard />
      </div>
    </>
  );
};

export default DashboardPage;
