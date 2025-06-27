"use client";
import { useEffect, useState } from "react";
import ProductCard from "./products/ProductCard";
import { NextPageButton, ProductPagination } from "./products/ProductPagination";
import { usePaginationStore } from "../hooks/store";
import { Flower2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ProductsProps = {
  id: string,
  name: string,
  price: number,
  image: string
}

type ProductDetailModalProps = {
  id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  categories: {
    name: string
  },
  certifications: {
    certification: {
      id: string,
      name: string,
      image: string
    }
  }[]
}

const ProductsSection = () => {
  const { page, isLastPage, setTotal } = usePaginationStore();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetailModalProps | null>(null);

  const formatToVnd = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);
  }

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

  const handleOpen = async (id: string) => {
    setIsProductLoading(true);
    const res = await fetch(`/api/users/products/${id}`);
    const data = await res.json();
    setProduct(data);
    setIsProductLoading(false);
  }

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
              <Dialog key={p.id}>
                <DialogTrigger onClick={() => handleOpen(p.id)}>
                  <ProductCard name={p.name} image={p.image} price={p.price} />
                </DialogTrigger>

                <DialogContent
                  className="sm:min-w-3/4 xl:min-w-1/2 max-h-3/4 overflow-auto"
                >
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                  </DialogHeader>

                  <div>
                    {!isProductLoading && product ? (
                      <div className="grid sm:grid-cols-[40%_60%]">
                        <div>
                          <div className="w-[75%] mx-auto sm:w-full aspect-square relative border border-accent rounded-md overflow-hidden">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px): 75%,(max-width: 1902px) 100%" />
                          </div>

                          <div className="hidden sm:block">
                            {product.certifications.length > 0 && (
                              <div>
                                <h3 className="text-lg mt-4">Chứng nhận:</h3>
                                {product.certifications.map((cert) => (
                                  <Tooltip key={cert.certification.id}>
                                    <TooltipTrigger>
                                      <div className="w-[70px] aspect-square relative">
                                        <Image src={cert.certification.image} alt={cert.certification.name} fill className="object-contain" sizes="(max-width: 1920px) 70px" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="text-md">{cert.certification.name}</TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                        <div className="sm:pl-6 pt-8 sm:col-start-2">
                          <h2 className="text-lg sm:text-xl mb-4">{product.name}</h2>

                          <div className="text-lg mb-4">Giá: <span className="font-bold">{formatToVnd(product.price)}</span></div>

                          <div className="text-lg mb-4">Phân loại: <span className="text-nowrap text-sm text-white bg-primary shadow-lg rounded-md py-2 px-3">{product.categories.name}</span></div>

                          <div className="text-lg">
                            Mô tả:
                            <p className="text-sm">{product.description}</p>
                          </div>
                        </div>


                        <div className="block sm:hidden">
                          {product.certifications.length > 0 && (
                            <div>
                              <h3 className="text-lg mt-4">Chứng nhận:</h3>
                              {product.certifications.map((cert) => (
                                <div key={cert.certification.id} className="flex items-center gap-3 sm:block">
                                  <Tooltip>
                                    <TooltipTrigger className="block">
                                      <div className="w-[70px] aspect-square relative">
                                        <Image src={cert.certification.image} alt={cert.certification.name} fill className="object-contain" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="text-md">{cert.certification.name}</TooltipContent>
                                  </Tooltip>
                                  <p className="block sm:hidden">{cert.certification.name}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <LoaderCircle color="#737373" size={50} className="animate-spin" />
                        <p>Đang tải sản phẩm...</p>
                      </div>
                    )}
                  </div>
                  <DialogDescription className="hidden">THis</DialogDescription>
                </DialogContent>
              </Dialog>
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
