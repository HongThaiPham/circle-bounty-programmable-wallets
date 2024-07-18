"use server";

import { redis } from "@/lib/redis";
import CartType from "@/types/Cart.type";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function removeFromCart(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const productId = formData.get("productId") as string;

  let cart: CartType | null = await redis.get(`circle-store-cart:${user.id}`);

  if (cart && cart.items) {
    const updatedCart: CartType = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`circle-store-cart:${user.id}`, updatedCart);
  }

  revalidatePath("/", "layout");
}
