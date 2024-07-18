import EditProductForm from "@/components/products/EditProductForm";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
const ProductDetailPage: React.FC<Props> = async ({ params: { id } }) => {
  const data = await getData(id);
  return <EditProductForm data={data} />;
};

export default ProductDetailPage;
