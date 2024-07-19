import { axios } from "@/lib/axios";
import { Wallet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const walletsHelper = async () => {
  return axios
    .get<{
      wallets: Wallet[];
    }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/list-wallets`)
    .then((res) => res.data);
};

const useUserWallets = (refetchInterval?: any) => {
  return useQuery<{ wallets: Wallet[] }>({
    queryKey: ["list-wallets"],
    queryFn: () => walletsHelper(),
    refetchInterval: refetchInterval,
  });
};

export default useUserWallets;
