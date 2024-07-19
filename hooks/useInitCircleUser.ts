import { useW3sContext } from "@/components/CircleClientProvider";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useInitCircleUser = () => {
  const { client } = useW3sContext();
  return useMutation<{
    userToken: string;
    encryptionKey: string;
    challengeId: string;
    message?: string;
  }>({
    mutationKey: ["init-circle-user"],
    mutationFn: async () => {
      return axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/init-user`)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.message) {
        toast.info(data.message);
      } else {
        client?.execute(data.challengeId);
        toast.success("Circle User initialized successfully");
      }
    },
    onError: (error) => {
      toast.error((error as any).response.data.message);
    },
  });
};

export default useInitCircleUser;
