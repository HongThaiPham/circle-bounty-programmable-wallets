import { getCircleUserAuthData } from "@/lib/circle";
import circleUserServerSdk from "@/utils/circle-user-server";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Params = { params: { id: string } };
export async function GET(req: Request, { params: { id } }: Params) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // If you throw, the user will not be able to upload
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userDb = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userDb) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const { data: authRespone } = await getCircleUserAuthData(userDb.uid);
  if (authRespone && authRespone.userToken && authRespone.encryptionKey) {
    const { data } = await circleUserServerSdk.getWalletTokenBalance({
      userToken: authRespone.userToken,
      walletId: id,
    });

    return Response.json({ tokenBalances: data?.tokenBalances });
  }

  return Response.json({ tokenBalances: [] });
}
