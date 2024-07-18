"use server";

import { isManager } from "@/app/_actions/isManager";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/utils/zodSchemas";
import { redirect } from "next/navigation";
import prisma from "@/utils/db";

export async function editProduct(prevState: unknown, formData: FormData) {
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

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: parsedData.value.name,
      description: parsedData.value.description,
      categoryId: parsedData.value.categoryId,
      price: parsedData.value.price,
      isFeatured: parsedData.value.isFeatured === true ? true : false,
      status: parsedData.value.status,
      images: flatenUrls,
    },
  });

  redirect("/dashboard/products");
}
