"use server";

import { isManager } from "@/app/_actions/isManager";
import prisma from "@/utils/db";
import { bannerSchema } from "@/utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createBanner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id || !(await isManager())) {
    return redirect("/");
  }

  const parsedData = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (parsedData.status !== "success") {
    return parsedData.reply();
  }

  await prisma.banner.create({
    data: {
      title: parsedData.value.title,
      imageString: parsedData.value.imageString,
    },
  });

  return redirect("/dashboard/banner");
}
