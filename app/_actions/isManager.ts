"use server";

import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function isManager() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return false;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
      role: "MANAGER",
    },
  });

  if (!dbUser) {
    return false;
  }

  return true;
}
