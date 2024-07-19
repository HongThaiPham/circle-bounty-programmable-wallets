import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const usePaymentStatus = (orderId: string) => {
  return useQuery<{ orderId: string; status: "PENDING" | "COMPLETE" }>({
    queryKey: ["circle-payment-status", orderId],
    queryFn: async () => {
      return axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${orderId}/status`)
        .then((res) => res.data);
    },
    refetchInterval: (query) => {
      if (query.state.data?.status !== "COMPLETE") return 1000;
      return false;
    },
  });
};

export default usePaymentStatus;
