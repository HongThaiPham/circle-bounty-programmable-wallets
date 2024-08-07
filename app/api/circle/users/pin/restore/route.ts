import { getCircleUserAuthData } from "@/lib/circle";
import circleUserServerSdk from "@/utils/circle-user-server";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
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

  try {
    const authData = await getCircleUserAuthData(userDb.uid);
    if (!authData.data) {
      return Response.json(
        { error: "Error when get auth data" },
        { status: 401 }
      );
    }
    const response = await circleUserServerSdk.restoreUserPin({
      userToken: authData.data?.userToken,
    });

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      {
        message:
          (error as any).response.data.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
