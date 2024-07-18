import { getCircleUserAuthData } from "@/lib/circle";
import circleUserServerSdk from "@/utils/circle-user-server";
import prisma from "@/utils/db";
import { Blockchain } from "@circle-fin/user-controlled-wallets";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST() {
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
    const response = await getCircleUserAuthData(userDb.uid);

    let userToken;
    let encryptionKey;

    if (
      response &&
      response.data &&
      response.data.userToken &&
      response.data.encryptionKey
    ) {
      userToken = response.data.userToken;
      encryptionKey = response.data.encryptionKey;

      const existed = await circleUserServerSdk.getUserStatus({ userToken });

      if (
        existed &&
        existed.data &&
        existed.data.pinStatus &&
        existed.data.pinStatus === "UNSET"
      ) {
        const createWalletResponse =
          await circleUserServerSdk.createUserPinWithWallets({
            userToken,
            accountType: "EOA",
            blockchains: [
              process.env.NEXT_PUBLIC_DEFAULT_BLOCKCHAIN as Blockchain,
            ],
          });

        let challengeId;

        if (
          createWalletResponse.data &&
          createWalletResponse.data.challengeId
        ) {
          challengeId = createWalletResponse.data.challengeId;
        }

        const data = {
          userToken: userToken,
          encryptionKey: encryptionKey,
          challengeId: challengeId,
        };

        return Response.json(data);
      }
      return Response.json({
        message: "The user had already been initialized",
      });
    } else {
      return Response.json({});
    }
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
