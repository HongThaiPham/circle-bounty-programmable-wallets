import CategorySelect from "@/components/storefront/CategorySelect";
import FeaturedProducts from "@/components/storefront/FeaturedProducts";
import Hero from "@/components/storefront/Hero";
import React from "react";

type Props = {};

const HomePage: React.FC<Props> = ({}) => {
  return (
    <div>
      <Hero />
      <CategorySelect />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
