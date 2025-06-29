import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tag } from "lucide-react";
import Image from "next/image";

type ProductProps = {
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductProps) => {
  const formatToVnd = () => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);
  }
  return (
    <Card className="p-0 overflow-hidden rounded-2xl h-[400px] w-[300px] bg-white h-fit pb-5 hover:cursor-pointer hover:border-primary transform transition-all duration-75 active:scale-95">
      <CardHeader className="p-0 relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
          priority
        />
      </CardHeader>

      <CardContent>
        <p className="text-lg line-clamp-2 leading-[1.5] min-h-[3em]">{name}</p>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2">
          <Tag />
          {formatToVnd()}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;
