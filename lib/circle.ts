import circleUserServerSdk from "@/utils/circle-user-server";

export const getCircleUserAuthData = async (userId: string) => {
  const response = await circleUserServerSdk.createUserToken({
    userId,
  });

  return response;
};

// export const getCircleUserAuthData = async (userId: string) => {
//   const response = await circleUserServerSdk.createUserToken({
//     userId,
//   });

//   let userToken;
//   let encryptionKey;
//   let challengeId;
//   if (
//     response &&
//     response.data &&
//     response.data.userToken &&
//     response.data.encryptionKey
//   ) {
//     userToken = response.data.userToken;
//     encryptionKey = response.data.encryptionKey;
//     const createWalletResponse =
//       await circleUserServerSdk.createUserPinWithWallets({
//         userToken,
//         accountType: "EOA",
//         blockchains: [process.env.NEXT_PUBLIC_DEFAULT_BLOCKCHAIN as Blockchain],
//       });

//     let challengeId;

//     if (createWalletResponse.data && createWalletResponse.data.challengeId) {
//       challengeId = createWalletResponse.data.challengeId;
//     }
//   }

//   return {
//     userToken,
//     encryptionKey,
//     challengeId,
//   };
// };
