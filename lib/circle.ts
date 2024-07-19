import circleUserServerSdk from "@/utils/circle-user-server";

export const getCircleUserAuthData = async (userId: string) => {
  const response = await circleUserServerSdk.createUserToken({
    userId,
  });

  return response;
};
