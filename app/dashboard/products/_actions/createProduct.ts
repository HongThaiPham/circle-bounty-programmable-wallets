"use server";

import { isManager } from "@/app/_actions/isManager";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/utils/zodSchemas";
import { redirect } from "next/navigation";
import prisma from "@/utils/db";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id || !(await isManager())) {
    return redirect("/");
  }

  const parsedData = parseWithZod(formData, {
    schema: productSchema,
  });

  if (parsedData.status !== "success") {
    return parsedData.reply();
  }

  const flatenUrls = parsedData.value.images.flatMap((urlsString) =>
    urlsString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: parsedData.value.name,
      description: parsedData.value.description,
      status: parsedData.value.status,
      price: parsedData.value.price,
      images: flatenUrls,
      categoryId: parsedData.value.categoryId,
      isFeatured: parsedData.value.isFeatured,
    },
  });

  return redirect("/dashboard/products");
}
