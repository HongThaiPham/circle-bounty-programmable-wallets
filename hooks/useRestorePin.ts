"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const restorePinHelper = async () => {
  const response = await axios.post<{ challengeId: string }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/circle/users/pin/restore`
  );

  return response.data.challengeId;
};

export const useRestorePinMutation = () => {
  return useMutation({
    mutationKey: ["restorePin"],
    mutationFn: () => restorePinHelper(),
  });
};
