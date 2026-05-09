import Image from "next/image";

const GoalsSection = () => {
  return (
    <section className="py-24 scroll-mt-28" id="goals">
      <div className="text-center mb-16">
        <span className="font-gwendolyn text-3xl text-primary mb-2 block">Tầm nhìn & Sứ mệnh</span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Mục Tiêu Phát Triển</h2>
        <div className="w-24 h-1 bg-primary/20 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="space-y-24">
        {/* Goal 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src="/images/bbmd3.jpeg" 
              alt="Nâng tầm đặc sản" 
              fill 
              className="object-cover" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-4">
              GIAI ĐOẠN 2025 - 2027
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-6 leading-tight">
              Nâng cấp tiêu chuẩn OCOP 4 sao & Đa dạng hóa sản phẩm
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              &quot;Hợp tác xã Bồn Bồn Minh Duy đặt mục tiêu tăng sản lượng, đa dạng hóa sản phẩm từ cây bồn bồn và duy trì chất lượng ổn định. Chúng tôi hướng đến nâng cấp sản phẩm đạt chuẩn OCOP 4 sao, đồng thời chú trọng đào tạo, cải thiện tay nghề cho lao động địa phương.&quot;
            </p>
          </div>
        </div>

        {/* Goal 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src="/images/bbmd4.jpeg" 
              alt="Lan tỏa giá trị" 
              fill 
              className="object-cover" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-4">
              TẦM NHÌN DÀI HẠN
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-6 leading-tight">
              Kết nối cộng đồng & Mở rộng thị trường toàn quốc
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              &quot;Chúng tôi mong muốn mở rộng liên kết với nhiều hộ trồng bồn bồn trong và ngoài tỉnh, từ đó xây dựng vùng nguyên liệu ổn định. Hợp tác xã hướng tới việc đưa sản phẩm ra khắp ba miền đất nước, tạo sinh kế lâu dài và nâng cao thu nhập cho nông dân.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoalsSection;
