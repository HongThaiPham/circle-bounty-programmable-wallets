"use client";
import React from "react";
import UserWalletsSelect from "./UserWalletsSelect";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import payWithCircle from "@/app/(storefront)/_actions/payWithCircle";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

type Props = {};

const CircleCheckoutForm: React.FC<Props> = ({}) => {
  // const [lastResult, action] = useFormState(createProduct, undefined);
  // const [form, fields] = useForm({
  //   lastResult,
  //   onValidate({ formData }) {
  //     return parseWithZod(formData, { schema: productSchema });
  //   },
  //   shouldValidate: "onBlur",
  //   shouldRevalidate: "onInput",
  // });
  return (
    <form action={payWithCircle} className="space-y-3">
      <UserWalletsSelect />

      <div className="w-full flex justify-center">
        <XCircle className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
      </div>

      <div className="mt-3 text-center sm:mt-5 w-full">
        <h3 className="text-lg leading-6 font-medium">Payment Cancelled</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong with your payment. You havent been charged.
          Please try again
        </p>

        <Button asChild className="w-full mt-5 sm:mt-6">
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
      <Button className="w-full" type="submit">
        Checkout
      </Button>
    </form>
  );
};

export default CircleCheckoutForm;
