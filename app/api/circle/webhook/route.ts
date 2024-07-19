import { redis } from "@/lib/redis";
import CircleHookDataType from "@/types/CircleHookData.type";
import prisma from "@/utils/db";
import { headers } from "next/headers";

// Define the EC public key ASN.1 syntax

export async function POST(req: Request) {
  const body: CircleHookDataType = await req.json(); //await req.text();

  const keyId = headers().get("X-Circle-Key-Id") as string;
  const signature = headers().get("X-Circle-Signature") as string;

  console.table({ keyId, signature, body });

  if (
    body.notificationType === "transactions.outbound" &&
    body.notification.state === "COMPLETE"
  ) {
    const [userId, orderId] = body.notification.refId?.split("|") as string[];
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "COMPLETE",
      },
    });

    await redis.del(`circle-store-cart:${userId}`);
  }

  // veriry signature
  // const checkPublicKey = await fetch(
  //   `https://api.circle.com/v2/notifications/publicKey/${keyId}`,
  //   {
  //     headers: {
  //       accept: "application/json",
  //       Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
  //     },
  //   }
  // ).then((res) => res.json());

  return new Response(null, { status: 200 });
}
