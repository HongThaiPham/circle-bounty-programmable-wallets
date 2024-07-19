"use client";
import useCircleWalletBalance from "@/hooks/useCircleWalletBalance";
import Image from "next/image";
import React, { useMemo } from "react";
import CircleFaucetButton from "./CircleFaucetButton";
import { Loader2 } from "lucide-react";

type Props = {
  walletId: string;
  address?: string;
};

const CircleUsdcBalance: React.FC<Props> = ({ walletId, address }) => {
  const { data: tokenBalance, isPending } = useCircleWalletBalance(walletId);

  const usdcBalance = useMemo(() => {
    return tokenBalance?.tokenBalances?.find(
      (token) => token.token.symbol === "USDC"
    )?.amount;
  }, [tokenBalance?.tokenBalances]);
  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        <Image src="/USDC.svg" width={20} height={20} alt="USDC" />
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <span className="text-md font-bold">
            {new Intl.NumberFormat("en-US").format(Number(usdcBalance || 0))}
          </span>
        )}
      </div>
      {address && Number(usdcBalance || 0) === 0 ? (
        <CircleFaucetButton address={address} />
      ) : null}
    </>
  );
};

export default CircleUsdcBalance;
