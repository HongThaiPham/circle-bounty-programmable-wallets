"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";
import { bannerSchema } from "@/utils/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { createBanner } from "../_actions/createBanner";
import ButtonSubmitProductForm from "@/components/products/ButtonSubmitProductForm";

type Props = {};

const NewBannerPage: React.FC<Props> = ({}) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = () => {
    setImage(undefined);
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/banner">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight ">New banner</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>
            Fill in the details for the new banner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                type="text"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Enter banner title"
                className="w-full"
              />
              <p className="text-rose-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="hidden"
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue as any}
              />
              {image !== undefined ? (
                <div className="flex gap-5">
                  <div className="relative w-[200px] h-[200px]">
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt="Banner Image"
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      className="absolute -top-3 -right-3 bg-rose-500 p-2 rounded-lg text-white"
                      onClick={handleDelete}
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <UploadDropzone
                  endpoint={"bannerUploader"}
                  onClientUploadComplete={(res) => {
                    console.log("Uploaded");
                    console.log("Files: ", res);
                    setImage(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    console.error(`ERROR! ${error.message}`);
                  }}
                />
              )}
              <p className="text-rose-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <ButtonSubmitProductForm text="New Banner" />
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewBannerPage;
