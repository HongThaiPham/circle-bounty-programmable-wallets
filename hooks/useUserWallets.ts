import { axios } from "@/lib/axios";
import { Wallet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const walletsHelper = async () => {
  return axios
    .get<{
      wallet: Wallet;
    }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/list-wallets`)
    .then((res) => res.data);
};

const useUserWallets = (refetchInterval?: any) => {
  return useQuery<{ wallet: Wallet }>({
    queryKey: ["list-wallets"],
    queryFn: () => walletsHelper(),
    refetchInterval: (query) => {
      if (query.state.data?.wallet.id) return 10000;
      return 1000;
    },
  });
};

export default useUserWallets;
