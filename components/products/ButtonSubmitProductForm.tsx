"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  text: string;
} & ButtonProps;

const ButtonSubmitProductForm: React.FC<Props> = ({
  text,
  children,
  ...props
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled {...props}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing ...
        </Button>
      ) : (
        <Button type="submit" {...props}>
          {children}
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonSubmitProductForm;
