import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { deleteProduct } from "../../_actions/deleteProduct";
import ButtonSubmitProductForm from "@/components/products/ButtonSubmitProductForm";

type Props = {
  params: {
    id: string;
  };
};

const DeleteProductPage: React.FC<Props> = ({ params: { id } }) => {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant={"secondary"} asChild>
            <Link href={`/dashboard/products`}>Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={id} />
            <ButtonSubmitProductForm
              text="Delete Product"
              variant={"destructive"}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteProductPage;
