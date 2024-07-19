import { getCircleUserAuthData } from "@/lib/circle";
import { redis } from "@/lib/redis";
import CartType from "@/types/Cart.type";
import circleUserServerSdk from "@/utils/circle-user-server";
import prisma from "@/utils/db";
import { Blockchain, FeeLevel } from "@circle-fin/user-controlled-wallets";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const FEE_LEVEL = (process.env.NEXT_PUBLIC_FEE_LEVEL! || "MEDIUM") as FeeLevel;
export async function POST(req: Request) {
  const body = await req.json();
  const {
    walletId,
  }: {
    walletId: string;
  } = body;

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

  const cart: CartType | null = await redis.get(`circle-store-cart:${user.id}`);

  if (!cart || !cart.items || cart.items.length === 0) {
    return Response.json(
      {
        error:
          "Your cart is empty. Please add items to your cart before checking out.",
      },
      { status: 500 }
    );
  }

  const totalAmount = cart.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const createdOrder = await prisma.order.create({
    data: {
      amount: (totalAmount * 100) as number, // sync with stripe
      userId: user.id,
    },
  });

  if (!createdOrder) {
    return Response.json({
      error:
        "Something went wrong. Cannot create order at this time. Please try again later",
    });
  }

  const { data: authRespone } = await getCircleUserAuthData(userDb.uid);
  if (
    authRespone &&
    authRespone.userToken &&
    authRespone.encryptionKey &&
    createdOrder.id
  ) {
    const { data: dataBalance } =
      await circleUserServerSdk.getWalletTokenBalance({
        userToken: authRespone.userToken,
        walletId,
      });

    if (!dataBalance) {
      return Response.json({
        error:
          "Cannot get wallet balance. Please try again later or contact support.",
      });
    }

    const usdcBalance = dataBalance.tokenBalances?.find(
      (token) => token.token.symbol === "USDC"
    )?.amount;

    if (!usdcBalance || Number(usdcBalance) < totalAmount) {
      return Response.json({
        error:
          "Insufficient balance. Please top up your wallet before checking out.",
      });
    }

    const response = await circleUserServerSdk.createTransaction({
      userToken: authRespone.userToken,
      fee: {
        type: "level",
        config: {
          feeLevel: FEE_LEVEL,
        },
      },
      amounts: [totalAmount.toString()],
      walletId,
      destinationAddress: process.env.NEXT_PUBLIC_STORE_PAYMENT_ADDRESS!,
      tokenAddress: process.env.NEXT_PUBLIC_USDC_ADDRESS!,
      blockchain: process.env.NEXT_PUBLIC_DEFAULT_BLOCKCHAIN! as Blockchain,
      refId: `${user.id}|${createdOrder.id.toString()}`,
    });

    return Response.json({
      challengeId: response.data?.challengeId,
      orderId: createdOrder.id,
      userId: user.id,
      circleId: userDb.uid,
    });
  }

  return Response.json({ error: "Something went wrong." }, { status: 500 });
}
