"use client";
import CategorySlider from "../components/CategorySlider";
import Header from "../_featured/header";
import ProductCardsList from "../components/ProductCardsList";

export default function ListView() {
  return (
    <div>
      <Header />
      <CategorySlider />
      <ProductCardsList/>
    </div>
  );
}
