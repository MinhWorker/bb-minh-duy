import { Card, CardContent } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { MoveRight } from "lucide-react"
import { usePaginationStore } from "../../hooks/store"

const NextPageButton = () => {
  const { nextPage } = usePaginationStore();
  return (
    <Card
      className="border-primary justify-center overflow-hidden hidden md:block"
      onClick={(e) => {
        e.preventDefault();
        nextPage();

        const target = document.getElementById("products"); // ← your section id
        target?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <CardContent className="flex items-center text-primary text-xl gap-2 justify-center transform transition-all hover:bg-primary hover:text-white h-full hover:cursor-pointer">
        Trang tiếp
        <MoveRight />
      </CardContent>
    </Card>)
}

const ProductPagination = () => {
  const { page, setPage, nextPage, prevPage, totalPages, isLastPage } = usePaginationStore();

  const pages = Array.from({ length: totalPages() }, (_, i) => i + 1);

  return (
    <Pagination className="mt-7">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 ? "bg-accent" : "bg-primary hover:bg-primary-foreground"}`}
            href="#products"
            onClick={(e) => {
              if (page === 1) {
                e.preventDefault();
                return;
              }
              prevPage();
            }}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              className="text-lg"
              href="#products"
              isActive={page === p}
              onClick={() => {
                setPage(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            className={`${isLastPage() ? "bg-accent" : "bg-primary hover:bg-primary-foreground"}`}
            href="#products"
            onClick={(e) => {
              if (isLastPage()) {
                e.preventDefault();
                return;
              }
              nextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { NextPageButton, ProductPagination };
