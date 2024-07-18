import ButtonSubmitProductForm from "@/components/products/ButtonSubmitProductForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { deleteBanner } from "../../_actions/deleteBanner";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const BannerDeletePage: React.FC<Props> = ({ params: { id } }) => {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the
            banner.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant={"secondary"} asChild>
            <Link href={`/dashboard/banner`}>Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={id} />
            <ButtonSubmitProductForm
              text="Delete Banner"
              variant={"destructive"}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BannerDeletePage;
