import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import circleUserServerSdk from "@/utils/circle-user-server";
export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    const uid = uuidv4();
    await prisma.user.create({
      data: {
        id: user.id,
        uid,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });

    // create circle user
    await circleUserServerSdk.createUser({
      userId: uid,
    });
  }

  return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
}
