import Image from "next/image";

const ProceduresSection = () => {
  return (
    <section className="my-12 scroll-mt-28" id="procedures">
      <h1 className="text-primary-foreground text-center font-semibold text-[40px] mb-4 text-shadow-md text-shadow-accent/25">QUY TRÌNH</h1>

      <div className="relative w-full md:h-[300px] lg:h-[400px] hidden md:block">
        <Image
          src="/images/procedure-web.png"
          alt="Quy trình làm việc"
          fill
          className="object-contain mx-auto"
        />
      </div>

      <div className="relative w-full h-[900px] md:hidden">
        <Image
          src="/images/procedure-mobile.png"
          alt="Quy trình làm việc"
          fill
          className="object-contain mx-auto"
        />
      </div>
    </section>
  )
}

export default ProceduresSection;
