"use client";
import { Button } from "@/components/ui/button";
import useCircleRequestTestnetToken from "@/hooks/useCircleRequestTestnetToken";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  address?: string | undefined;
};

const CircleFaucetButton: React.FC<Props> = ({ address }) => {
  const { mutate, isPending } = useCircleRequestTestnetToken();

  const handleClick = () => {
    if (!address) return;
    mutate({ address });
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      {isPending ? <Loader2 className="mr-2 animate-spin" /> : null}
      {isPending ? "Requesting..." : "Request Testnet Token"}
    </Button>
  );
};

export default CircleFaucetButton;
