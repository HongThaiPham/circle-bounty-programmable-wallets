"use server";

import { redis } from "@/lib/redis";
import CartType from "@/types/Cart.type";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addToCart(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  let cart: CartType | null = await redis.get(`circle-store-cart:${user.id}`);

  const productFromDb = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  if (!productFromDb) {
    throw new Error("Product not found");
  }

  if (!cart || !cart.items) {
    cart = {
      userId: user.id,
      items: [
        {
          id: productFromDb.id,
          name: productFromDb.name,
          price: productFromDb.price,
          imageString: productFromDb.images[0],
          quantity: 1,
        },
      ],
    };
  } else {
    const existingProduct = cart.items.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.items.push({
        id: productFromDb.id,
        name: productFromDb.name,
        price: productFromDb.price,
        imageString: productFromDb.images[0],
        quantity: 1,
      });
    }
  }

  console.log(cart);

  await redis.set(`cart:${user.id}`, cart);

  revalidatePath("/", "layout");
}
