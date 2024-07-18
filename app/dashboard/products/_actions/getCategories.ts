"use server";

import prisma from "@/utils/db";

export async function getCategories() {
  return await prisma.category.findMany();
}
