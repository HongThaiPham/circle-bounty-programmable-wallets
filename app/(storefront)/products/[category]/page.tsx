import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import ProductCard from "@/components/storefront/ProductCard";
type Props = {
  params: {
    category: string;
  };
};

async function getData(categoryName: string) {
  const select = {
    name: true,
    images: true,
    price: true,
    id: true,
    description: true,
  };
  if (categoryName === "all") {
    const data = await prisma.product.findMany({
      select,
      where: {
        status: "PUBLISHED",
      },
    });

    return {
      title: "All Products",
      data: data,
    };
  } else {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: categoryName,
          mode: "insensitive",
        },
      },
    });

    if (!category) {
      return notFound();
    }

    const data = await prisma.product.findMany({
      where: {
        status: "PUBLISHED",
        category: {
          name: {
            equals: categoryName,
            mode: "insensitive",
          },
        },
      },
      select,
    });

    return {
      title: `Products for ${categoryName.toUpperCase()}`,
      data: data,
    };
  }
}

const ProductsByCategoryPage: React.FC<Props> = async ({ params }) => {
  noStore();
  const { data, title } = await getData(params.category);

  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default ProductsByCategoryPage;
