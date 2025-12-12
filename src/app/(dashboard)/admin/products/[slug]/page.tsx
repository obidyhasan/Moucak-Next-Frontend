import EditProductPage from "@/components/modules/Product/EditProductPage";
import { getProducts } from "@/services/products/Products";

const page = async () => {
  const data = await getProducts();
  const products = data?.data || [];

  return (
    <div>
      <EditProductPage data={products} />
    </div>
  );
};

export default page;
