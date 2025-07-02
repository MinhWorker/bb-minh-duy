import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className="pt-10" id="aboutus">
      <div className="h-screen bg-[url('/images/bbmd1.jpeg')] bg-cover bg-center flex items-center">
        <div className="sm:flex items-center justify-end bg-primary-foreground/90 rounded-r-[50px] w-[80%] xl:w-1/2 min-w-[300px] shadow-lg p-10">
          <div className="relative w-[100px] md:w-[200px] aspect-square mr-8 mb-6">
            <Image src="/images/cattail1.png" fill alt="cattail1" className="object-contain" sizes="(max-width: 768px) 100px, (max-width: 1920px) 100px" />
          </div>

          <div className="text-white sm:w-[85%] lg:w-[60%]">
            <h1 className="text-3xl font-semibold mb-3">
              VỀ CHÚNG TÔI
            </h1>
            <p className="text-sm md:text-lg text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div >
    </section >
  )
}

export default AboutUsSection;
