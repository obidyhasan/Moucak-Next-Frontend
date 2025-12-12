import ProductDetail from "@/components/modules/ProductDetail/ProductDetail";
import { getProducts, getSingleProduct } from "@/services/products/Products";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getSingleProduct(slug)) || {};
  const productsResult = await getProducts(slug);
  const products = productsResult?.data || [];

  return (
    <div>
      <ProductDetail slug={slug} product={product} allProducts={products} />
    </div>
  );
}
