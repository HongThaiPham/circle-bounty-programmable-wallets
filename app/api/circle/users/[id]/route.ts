import { getCircleUserAuthData } from "@/lib/circle";
import circleUserServerSdk from "@/utils/circle-user-server";
import prisma from "@/utils/db";

type Params = { params: { id: string } };
export async function GET(req: Request, { params: { id } }: Params) {
  const userDb = await prisma.user.findUnique({
    where: {
      id,
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

  const { data } = await circleUserServerSdk.getUser({
    userId: userDb.uid,
  });

  return Response.json(data);
}
