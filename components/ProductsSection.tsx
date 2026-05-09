"use client";
import { useEffect, useState } from "react";
import ProductCard from "./products/ProductCard";
import { NextPageButton, ProductPagination } from "./products/ProductPagination";
import { usePaginationStore } from "../hooks/store";
import { Flower2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ProductFilter from "./products/ProductFilter";
import { MultiValue } from "react-select";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type ProductsProps = {
  id: string,
  name: string,
  price: number,
  image: string,
  ocopLevel?: number
}

type ProductDetailModalProps = {
  id: string,
  name: string,
  description: string,
  price: number,
  unit: string,
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
  const [chosenCategories, setChosenCategories] = useState<MultiValue<
    {
      value: string,
      label: string
    }
  >>([]);

  const formatToVnd = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);
  }

  useEffect(() => {
    const fetchProducts = async (options?: string[]) => {
      setIsLoading(true);
      const res = await fetch(`/api/users/products?page=${page}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryIds: options
        }),
      });
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
      setIsLoading(false);
    };

    const formattedCategories = chosenCategories.map((category) => category.value);

    fetchProducts(formattedCategories);
  }, [page, chosenCategories, setTotal]);

  const handleFilter = async (
    options?: string[]) => {
    setIsLoading(true);
    const res = await fetch(`/api/users/products?page=${page}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryIds: options
      }),
    });
    const data = await res.json();
    setProducts(data.products);
    setTotal(data.total);
    setIsLoading(false);
  }

  const handleOpen = async (id: string) => {
    setIsProductLoading(true);
    const res = await fetch(`/api/users/products/${id}`);
    const data = await res.json();
    setProduct(data);
    setIsProductLoading(false);
  }

  return (
    <section className="py-24 scroll-mt-28 relative" id="products">
      <div className="text-center mb-16">
        <span className="font-gwendolyn text-3xl text-primary mb-2 block">Sản phẩm của chúng tôi</span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Đặc Sản Cà Mau</h2>
        <div className="w-24 h-1 bg-primary/20 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="mb-12">
        <ProductFilter handleFilter={handleFilter} chosenCategories={chosenCategories} setChosenCategories={setChosenCategories} />
      </div>

      <div className="flex justify-center px-4">
        {!isLoading && products ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
            {products.map((p: ProductsProps) => (
              <Dialog key={p.id}>
                <DialogTrigger asChild onClick={() => handleOpen(p.id)}>
                  <div className="cursor-pointer">
                    <ProductCard name={p.name} image={p.image} price={p.price} ocopLevel={p.ocopLevel} />
                  </div>
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
                          <div className="w-[75%] mx-auto sm:w-full aspect-square relative border border-accent rounded-md overflow-hidden hover:cursor-pointer" style={{ touchAction: "pan-y" }}>
                            <Zoom>
                              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px): 75%,(max-width: 1902px) 100%" />
                            </Zoom>
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

                          <div className="text-lg mb-4">Giá: <span className="font-bold">{formatToVnd(product.price)} / {product.unit}</span></div>

                          <div className="text-lg mb-4">Phân loại: <span className="text-nowrap text-sm text-white bg-primary shadow-lg rounded-md py-2 px-3">{product.categories.name}</span></div>

                            <div className="text-lg">
                                Mô tả:
                                <div
                                    className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
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
                                        <Image src={cert.certification.image} alt={cert.certification.name} fill className="object-contain" sizes="(max-width: 1920px) 70px" />
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
