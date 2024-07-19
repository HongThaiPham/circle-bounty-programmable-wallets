import circleUserServerSdk from "@/utils/circle-user-server";
import prisma from "@/utils/db";
import { TestnetBlockchain } from "@circle-fin/user-controlled-wallets/dist/types/clients/configurations";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  if (!address) {
    return Response.json({ error: "Address is required" }, { status: 400 });
  }
  const blockchain = searchParams.get("blockchain") as TestnetBlockchain;
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

  await circleUserServerSdk.requestTestnetTokens({
    address,
    blockchain: blockchain ?? "SOL-DEVNET",
    usdc: true,
  });

  return Response.json({ status: "ok" });
}
