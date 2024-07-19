"use client";
import SkeletonWapper from "@/components/SkeletonWapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUserWallets from "@/hooks/useUserWallets";
import { SelectProps } from "@radix-ui/react-select";
import React from "react";
import CircleInitWalletButton from "./CircleInitWalletButton";

type Props = {} & SelectProps;

const UserWalletsSelect: React.FC<Props> = ({ ...props }) => {
  const { data, isPending } = useUserWallets();
  if (data?.wallets.length === 0)
    return (
      <div className="space-y-2">
        <p className="text-sm">
          You don&apos;t have any wallet yet. Please create a wallet to continue
        </p>
        <CircleInitWalletButton />
      </div>
    );

  const handleWalletChange = (value: string) => {
    console.log(value);
  };

  return (
    <SkeletonWapper isLoading={isPending}>
      <h3 className="text-md leading-6 font-medium">Choose wallet to pay</h3>
      <Select
        {...props}
        defaultValue={data?.wallets[0]?.id}
        onValueChange={handleWalletChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select wallet to pay" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Your wallet</SelectLabel>
            {data?.wallets.map((wallet) => (
              <SelectItem key={wallet.id} value={wallet.id}>
                {wallet.address}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SkeletonWapper>
  );
};

export default UserWalletsSelect;
