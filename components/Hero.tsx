import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bbmd1.jpeg"
          alt="Cánh đồng bồn bồn Cà Mau"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <span className="font-gwendolyn text-3xl md:text-4xl text-primary-foreground/90 mb-4 block">
          Đặc sản Đất Mũi Cà Mau
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Hương Vị Phù Sa <br /> Trong Từng Sợi Bồn Bồn
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Sản phẩm OCOP 3 sao từ tâm huyết của những người nông dân Tân Hưng Đông, 
          gìn giữ nét văn hóa ẩm thực đặc trưng của miền Tây sông nước.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#products" 
            className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl"
          >
            Khám phá Sản phẩm
          </a>
          <a 
            href="#aboutus" 
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all"
          >
            Về chúng tôi
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
