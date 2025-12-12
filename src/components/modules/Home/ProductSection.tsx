/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProducts } from "@/services/products/Products";
import ProductCard from "../Product/ProductCard";

const ProductSection = async () => {
  const result = await getProducts();
  const products = result.data || [];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products?.map((product: any, idx: number) => (
        <ProductCard key={idx} product={product} />
      ))}
    </div>
  );
};

export default ProductSection;
