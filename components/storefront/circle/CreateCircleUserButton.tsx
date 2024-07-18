"use client";
import { useW3sContext } from "@/components/CircleClientProvider";
import { Button } from "@/components/ui/button";
import useInitCircleUser from "@/hooks/useInitCircleUser";
import React from "react";

type Props = {};

const CreateCircleUserButton: React.FC<Props> = ({}) => {
  const { client } = useW3sContext();
  const { mutateAsync } = useInitCircleUser();
  const handleCreate = async () => {
    const data = await mutateAsync();
    // client?.execute(data.challengeId, (error, result) => {
    //   if (error) {
    //     alert("An error occurred on PIN Setup. Please try again.");
    //   } else if (result) {
    //     // result will be undefined if popup is closed
    //     // only navigate to wallets if PIN setup complete
    //     console.log("PIN setup complete", result);
    //   }
    // });
  };
  return <Button onClick={handleCreate}>Create Circle User</Button>;
};

export default CreateCircleUserButton;
