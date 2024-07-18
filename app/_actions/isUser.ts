"use server";

import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function isUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return false;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
      role: "USER",
    },
  });

  if (!dbUser) {
    return false;
  }

  return true;
}
