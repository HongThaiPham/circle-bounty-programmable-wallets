"use server";

import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import CartType from "@/types/Cart.type";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const DOMAIN = process.env.NEXT_PUBLIC_BASE_URL!;

export default async function checkout() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: CartType | null = await redis.get(`circle-store-cart:${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${DOMAIN}/payment/success`,
      cancel_url: `${DOMAIN}/payment/cancel`,
      metadata: {
        userId: user.id,
      },
    });

    return redirect(session.url as string);
  }
}
