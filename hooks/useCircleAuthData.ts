import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCircleAuthData = () => {
  return useQuery<{ userToken: string; encryptionKey: string }>({
    queryKey: ["circle-auth-data"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/login`
      );
      return {
        userToken: data.userToken,
        encryptionKey: data.encryptionKey,
      };
    },
  });
};

export default useCircleAuthData;
