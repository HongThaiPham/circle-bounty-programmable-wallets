import { useW3sContext } from "@/components/CircleClientProvider";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCircleSendTransaction = (walletId: string) => {
  const { client } = useW3sContext();
  return useMutation<{
    challengeId: string;
    orderId: string;
    userId: string;
    circleId: string;
  } | null>({
    mutationKey: ["send-transaction", walletId],
    mutationFn: async () => {
      const data = await axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/transactions/send`,
          {
            walletId,
          }
        )
        .then((res) => res.data);

      if (data.error) {
        toast.error(data.error);
        return null;
      }

      return new Promise((resolve, reject) =>
        client?.execute(data.challengeId, (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(data);
          }
        })
      );
    },
    onSuccess(data) {
      if (data?.orderId) {
        toast.success("Transaction sent successfully");
      }
    },
    onError(error) {
      toast.error((error as any).response.data.message);
    },
  });
};

export default useCircleSendTransaction;
