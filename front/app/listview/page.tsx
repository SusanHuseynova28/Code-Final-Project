"use client";
import CategorySlider from "../_components/CategorySlider";
import Header from "../_featured/header";
import ProductCardsList from "../_components/ProductCardsList";

export default function ListView() {
  return (
    <div>
      <Header />
      <CategorySlider />
      <ProductCardsList/>
    </div>
  );
}
