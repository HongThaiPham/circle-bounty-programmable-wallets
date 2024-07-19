"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";

type Props = {
  mini?: boolean;
};

const AddToCartButton: React.FC<Props> = ({ mini = false }) => {
  const { pending } = useFormStatus();

  if (mini) {
    return (
      <>
        {pending ? (
          <Button
            disabled
            size="icon"
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
          </Button>
        ) : (
          <Button
            size="icon"
            type="submit"
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingCart className="mr-4 h-5 w-5" /> Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
