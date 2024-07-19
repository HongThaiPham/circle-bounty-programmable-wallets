import { axios } from "@/lib/axios";
import { TestnetBlockchain } from "@circle-fin/user-controlled-wallets/dist/types/clients/configurations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCircleRequestTestnetToken = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationKey: ["request-testnet-token"],
    mutationFn: async (params: {
      address: string;
      blockchain?: TestnetBlockchain;
    }) => {
      const { address, blockchain } = params;
      if (!address) {
        toast.error("Address is required");
        return;
      }
      return axios.get(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/circle/faucet?address=${address}&blockchain=${
          blockchain ?? "SOL-DEVNET"
        }`
      );
    },
    onSuccess: async () => {
      await queryCLient.invalidateQueries({
        queryKey: ["circle-wallet-balance"],
      });
      toast.success("Request success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCircleRequestTestnetToken;
