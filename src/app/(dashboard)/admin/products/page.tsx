/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import AddProductDialog from "@/components/modules/Product/AddProductDialog";
import AllProductTable from "@/components/modules/Product/AllProductTable";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/products/Products";

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      const result = await getProducts();
      if (!ignore) {
        setProducts(result?.data || []);
        setLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-2">
        <h1 className="text-xl font-semibold">Products</h1>
        <AddProductDialog
          onProductAdded={(newProduct) =>
            setProducts((prev) => [newProduct, ...prev])
          }
        >
          <Button>Add Product</Button>
        </AddProductDialog>
      </div>

      <div className="my-10">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <AllProductTable products={products} setProducts={setProducts} />
        )}
      </div>
    </div>
  );
};

export default Page;
