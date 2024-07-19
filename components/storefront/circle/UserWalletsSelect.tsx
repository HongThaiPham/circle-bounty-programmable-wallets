"use client";
import SkeletonWapper from "@/components/SkeletonWapper";
import useUserWallets from "@/hooks/useUserWallets";
import { SelectProps } from "@radix-ui/react-select";
import React from "react";
import CircleInitWalletButton from "./CircleInitWalletButton";
import CircleFaucetButton from "./CircleFaucetButton";
import useCircleWalletBalance from "@/hooks/useCircleWalletBalance";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ellipsify } from "@/lib/utils";
import { toast } from "sonner";
import CircleUsdcBalance from "./CircleUsdcBalance";

type Props = {} & SelectProps;

const UserWalletsSelect: React.FC<Props> = ({ ...props }) => {
  const { data: walletData, isPending } = useUserWallets();

  const { data: tokenBalance } = useCircleWalletBalance(
    walletData?.wallet.id ?? ""
  );

  const handleCopyAddress = () => {
    if (!walletData?.wallet) return;
    navigator.clipboard.writeText(walletData?.wallet.address);
    toast.success("Address copied to clipboard");
  };

  if (!isPending && !walletData?.wallet)
    return (
      <div className="space-y-2">
        <p className="text-sm">
          You don&apos;t have any wallet yet. Please create a wallet to continue
        </p>
        <CircleInitWalletButton />
      </div>
    );

  return (
    <SkeletonWapper isLoading={isPending}>
      <h3 className="text-md leading-6 font-medium">Your wallet address</h3>

      <div className="p-2 text-muted-foreground border rounded-md shadow-sm flex items-center justify-between">
        {walletData?.wallet && (
          <span>{ellipsify(walletData.wallet.address, 16)}</span>
        )}
        <Button size={"icon"} variant={"ghost"} onClick={handleCopyAddress}>
          <Copy className="w-4 h-4 cursor-pointer" />
        </Button>
      </div>
      {walletData?.wallet && (
        <CircleUsdcBalance walletId={walletData?.wallet.id} />
      )}
    </SkeletonWapper>
  );
};

export default UserWalletsSelect;
