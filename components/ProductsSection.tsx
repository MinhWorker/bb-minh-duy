"use client";
import { useEffect, useState } from "react";
import ProductCard from "./products/ProductCard";
import { NextPageButton, ProductPagination } from "./products/ProductPagination";
import { usePaginationStore } from "../hooks/store";
import { Flower2 } from "lucide-react";
import Image from "next/image";

type ProductsProps = {
  id: string,
  name: string,
  price: number,
  image: string
}

const ProductsSection = () => {
  const { page, isLastPage, setTotal } = usePaginationStore();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/users/products?page=${page}`);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
      setIsLoading(false);
    };

    fetchProducts();
  }, [page]);


  return (
    <section className="my-12 min-h-screen scroll-mt-28 relative" id="products">
      <h1 className="text-primary-foreground text-center font-semibold text-[40px] mb-4 text-shadow-md text-shadow-accent/25">SẢN PHẨM</h1>

      {/* pure background asset */}
      <div className="absolute top-10 left-0 -z-10 w-[400px] aspect-square">
        <Image
          src="/images/cattail2.png"
          alt=""
          fill
          aria-hidden={true}
          className="object-contain"
          sizes="(max-width: 1902px) 400px"
        />
      </div>

      {/* pure background asset */}
      <div className="absolute bottom-10 right-0 -z-10 w-[400px] aspect-square">
        <Image
          src="/images/cattail3.png"
          alt=""
          fill
          aria-hidden={true}
          className="object-contain"
          sizes="(max-width: 1902px) 400px"
        />
      </div>

      <div className="flex justify-center">
        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {products.map((p: ProductsProps) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                image={p.image}
              />
            ))}


            {!isLastPage() && <NextPageButton />}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-10">
            <Flower2 color="#737373" strokeWidth={1} className="animate-bounce" size={100} />
            <p className="text-secondary text-lg mt-5">Sản phẩm tới ngay đây...</p>
          </div>
        )}

      </div>
      {!isLoading && <ProductPagination />}
    </section>
  )
}

export default ProductsSection;
