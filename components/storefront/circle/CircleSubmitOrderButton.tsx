"use client";
import { Button } from "@/components/ui/button";
import useCircleSendTransaction from "@/hooks/useCircleSendTransaction";
import { Loader2, Send } from "lucide-react";
import React from "react";

type Props = {
  walletId: string;
};

const CircleSubmitOrderButton: React.FC<Props> = ({ walletId }) => {
  const { mutate, isPending } = useCircleSendTransaction(walletId);
  const handleClick = () => {
    mutate();
  };
  return (
    <Button
      className="bg-blue-500 text-white p-3 rounded-md w-full"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Processing...
        </>
      ) : (
        <>
          Checkout <Send className="w-5 h-5 ml-3" />
        </>
      )}
    </Button>
  );
};

export default CircleSubmitOrderButton;
