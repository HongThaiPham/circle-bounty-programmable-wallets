import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import prisma from "@/utils/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const keyId = headers().get("X-Circle-Key-Id") as string;
  const signature = headers().get("X-Circle-Signature") as string;

  console.table({ keyId, signature, body });
  // let event;

  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     process.env.STRIPE_SECRET_WEBHOOK as string
  //   );
  // } catch (error: unknown) {
  //   return new Response("Webhook Error", { status: 400 });
  // }

  // switch (event.type) {
  //   case "checkout.session.completed": {
  //     const session = event.data.object;

  //     await prisma.order.create({
  //       data: {
  //         amount: session.amount_total as number,
  //         status: session.status as string,
  //         userId: session.metadata?.userId,
  //       },
  //     });

  //     await redis.del(`circle-store-cart:${session.metadata?.userId}`);
  //     break;
  //   }
  //   default: {
  //     console.log("unhandled event");
  //   }
  // }

  return new Response(null, { status: 200 });
}
