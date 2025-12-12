import SectionHeader from "@/components/shared/SectionHeader";
import ProductsSection from "./ProductsSection";

const ProductsPage = () => {
  return (
    <section className="my-12 max-w-7xl mx-auto px-4 w-full">
      <SectionHeader
        title="Our Products"
        subTitle="Explore our range of pure honey fresh from the hive and packed with natural goodness."
      />
      <ProductsSection />
    </section>
  );
};

export default ProductsPage;
