import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DashboardChart from "./DashboardChart";
import prisma from "@/utils/db";
import { unstable_noStore as noStore } from "next/cache";
type Props = {};

async function getData() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));

  return result;
}

const RecentTransactionsCard: React.FC<Props> = async ({}) => {
  noStore();
  const data = await getData();
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Recent transactions on your store</CardDescription>
      </CardHeader>
      <CardContent>
        <DashboardChart data={data} />
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;
