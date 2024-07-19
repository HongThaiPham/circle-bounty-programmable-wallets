import CircleCheckoutForm from "@/components/storefront/circle/CircleCheckoutForm";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

type Props = {};

const PayWithCirclePage: React.FC<Props> = ({}) => {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-[550px]">
        <CardHeader>
          <CardTitle>
            <Image
              src={"/CircleLogoWithName.svg"}
              width={100}
              height={100}
              alt="Circle Logo"
              className="w-auto h-auto"
            />
          </CardTitle>
        </CardHeader>
        <div className="p-6">
          <CircleCheckoutForm />
        </div>
        <Separator className="my-3" />
        <CardFooter>
          <span className="text-xs text-muted-foreground">
            Powered by Circle
          </span>
        </CardFooter>
      </Card>
    </section>
  );
};

export default PayWithCirclePage;
