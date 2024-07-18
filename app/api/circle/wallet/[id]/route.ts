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

  const authData = await getCircleUserAuthData(userDb.uid);
  if (!authData.data) {
    return Response.json(
      { error: "Error when get auth data" },
      { status: 401 }
    );
  }

  const { data } = await circleUserServerSdk.getWallet({
    userToken: authData.data?.userToken,
    id,
  });

  return Response.json(data);
}
