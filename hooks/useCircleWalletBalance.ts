import { axios } from "@/lib/axios";
import { Balance } from "@circle-fin/user-controlled-wallets";
import { useQuery } from "@tanstack/react-query";

const useCircleWalletBalance = (walletId: string) => {
  return useQuery<{ tokenBalances: Balance[] }>({
    queryKey: ["circle-wallet-balance"],
    queryFn: async () => {
      if (!walletId) return [];
      return axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/wallet/${walletId}/balance`
        )
        .then((res) => res.data);
    },
    refetchInterval: 5000,
  });
};

export default useCircleWalletBalance;
