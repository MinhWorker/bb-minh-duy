import Image from "next/image";

const ProceduresSection = () => {
  return (
    <section className="py-24 scroll-mt-28 bg-emerald-50/50" id="procedures">
      <div className="text-center mb-16 px-4">
        <span className="font-gwendolyn text-3xl text-primary mb-2 block">Quy trình sản xuất</span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Từ Cánh Đồng Đến Bàn Ăn</h2>
        <div className="w-24 h-1 bg-primary/20 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="relative w-full aspect-[16/6] hidden md:block">
          <Image
            src="/images/procedure-web.png"
            alt="Quy trình làm việc"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>

        <div className="relative w-full h-[800px] md:hidden">
          <Image
            src="/images/procedure-mobile.png"
            alt="Quy trình làm việc"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default ProceduresSection;
