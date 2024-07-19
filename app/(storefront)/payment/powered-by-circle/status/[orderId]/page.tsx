"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import usePaymentStatus from "@/hooks/usePaymentStatus";
import { Check, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    orderId: string;
  };
};

const CirclePaymentStatusPage: React.FC<Props> = ({ params: { orderId } }) => {
  const { data, isPending } = usePaymentStatus(orderId);
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-[450px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            {isPending || data?.status === "PENDING" ? (
              <RefreshCcw className="w-12 h-12 rounded-full bg-orange-500/30 text-orange-500 p-2 animate-spin" />
            ) : (
              <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
            )}
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              {data?.status === "COMPLETE"
                ? "Process completed"
                : "Processing your payment status"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {data?.status === "COMPLETE"
                ? "Congrats to your purchase. Your payment was succesfull. We hope you enjoy your product."
                : "Your payment is still processing. Please wait a moment."}
            </p>

            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CirclePaymentStatusPage;
