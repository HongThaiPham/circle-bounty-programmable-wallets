import { Button } from "@/components/ui/button";
import { redis } from "@/lib/redis";
import CartType from "@/types/Cart.type";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Bitcoin, CreditCard, ShoppingBag } from "lucide-react";
import { getSupportedArchTriples } from "next/dist/build/swc";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import removeFromCart from "../_actions/removeFromCart";
import RemoveFromCartButton from "@/components/products/RemoveFromCartButton";
import checkout from "../_actions/checkout";
import ButtonSubmitProductForm from "@/components/products/ButtonSubmitProductForm";
import { Separator } from "@/components/ui/separator";

type Props = {};

const CartPage: React.FC<Props> = async ({}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  const cart: CartType | null = await redis.get(
    `circle-store-cart:${user?.id}`
  );

  const totalPrice =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any products in your Bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please
            add some so that you can see them right here.
          </p>

          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  className="rounded-md object-cover"
                  fill
                  src={item.imageString}
                  alt="Product image"
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${item.price}</p>
                  </div>

                  <form action={removeFromCart} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <RemoveFromCartButton />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
            </div>
            <Separator className="my-5" />

            <div className="flex items-center justify-between font-medium">
              <p>Payment method:</p>
            </div>

            <div className="mt-5 w-full space-y-5">
              <form action={checkout} className="w-full">
                <ButtonSubmitProductForm
                  text={"Checkout with cash (Powered by Stripe)"}
                  className="w-full"
                  variant={"outline"}
                  size={"lg"}
                >
                  <CreditCard className="w-6 h-6 mr-2" />
                </ButtonSubmitProductForm>
              </form>
              <Button asChild className="w-full" size={"lg"}>
                <Link href={"/payment/powered-by-circle"}>
                  <Bitcoin className="w-6 h-6" />
                  Checkout with USDC (Powered by Circle)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
