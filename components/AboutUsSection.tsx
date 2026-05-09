import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className="py-24 bg-white" id="aboutus">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="relative w-full lg:w-1/2 aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/bbmd1.jpeg" 
              fill 
              alt="Cánh đồng bồn bồn" 
              className="object-cover" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
            />
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>

          <div className="w-full lg:w-1/2">
            <span className="font-gwendolyn text-3xl text-primary mb-2 block">Câu chuyện của chúng tôi</span>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Hợp tác xã Bồn Bồn Minh Duy
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-justify">
              <p>
                &quot;Chúng tôi là Hợp tác xã Bồn Bồn Minh Duy, nơi gắn bó với cây bồn bồn ngay tại vùng đất Tân Hưng Đông – Cái Nước, Cà Mau. Từ cây dân dã, chúng tôi làm nên đặc sản dưa bồn bồn OCOP, tạo việc làm cho phụ nữ địa phương và lan tỏa giá trị nông sản sạch.&quot;
              </p>
              <p>
                Mỗi sản phẩm là tâm huyết, là mong muốn phát triển bền vững cùng cộng đồng. Chúng tôi tự hào mang đến cho quý khách hàng không chỉ là một món ăn, mà là cả một bầu trời ký ức phù sa Đất Mũi.
              </p>
            </div>
            
            <div className="mt-10 p-6 bg-secondary/50 rounded-2xl border border-primary/10">
               <p className="font-medium text-primary italic">
                 &quot;Gìn giữ nghề truyền thống - Nâng tầm nông sản Việt&quot;
               </p>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default AboutUsSection;
