import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

type ProductProps = {
  name: string;
  price: number;
  image: string;
  ocopLevel?: number;
}

const ProductCard = ({ name, price, image, ocopLevel }: ProductProps) => {
  const formatToVnd = () => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);
  }
  return (
    <Card className="p-0 overflow-hidden rounded-3xl bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <CardHeader className="p-0 relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        {ocopLevel && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 shadow-md">
            <span>OCOP</span>
            <div className="flex items-center">
              {Array.from({ length: ocopLevel }).map((_, i) => (
                <Star key={i} size={10} fill="currentColor" className="text-yellow-500" />
              ))}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          {formatToVnd()}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          Chi tiết sản phẩm
        </button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;
