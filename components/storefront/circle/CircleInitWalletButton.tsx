"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import useInitCircleUser from "@/hooks/useInitCircleUser";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {} & ButtonProps;

const CircleInitWalletButton: React.FC<Props> = ({}) => {
  const { mutate, isPending } = useInitCircleUser();
  const handleCreate = async () => {
    mutate();
    // client?.execute(data.challengeId, (error, result) => {
    //   if (error) {
    //     alert("An error occurred on PIN Setup. Please try again.");
    //   } else if (result) {
    //     // result will be undefined if popup is closed
    //     // only navigate to wallets if PIN setup complete
    //     console.log("PIN setup complete", result);
    //   }
    // });
  };
  return (
    <Button onClick={handleCreate} className="w-full" disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
      {isPending ? "Creating Solana wallet..." : "Init a Solana wallet"}
    </Button>
  );
};

export default CircleInitWalletButton;
