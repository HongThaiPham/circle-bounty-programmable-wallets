"use client";
import { Loader2, Trash } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type Props = {};

const RemoveFromCartButton: React.FC<Props> = ({}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={"destructive"} size={"icon"}>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" variant={"destructive"} size={"icon"}>
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default RemoveFromCartButton;
