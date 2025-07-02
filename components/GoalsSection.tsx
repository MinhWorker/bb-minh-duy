import Image from "next/image";

const GoalsSection = () => {
  return (
    <section className="my-12 min-h-screen scroll-mt-28" id="goals">

      <h1 className="text-primary-foreground text-center font-semibold text-[40px] mb-4 text-shadow-md text-shadow-accent/25">MỤC TIÊU</h1>

      <div className="overflow-hidden relative">
        <div
          className="bg-[url('/images/bbmd3.jpeg')] bg-cover bg-center blur-xs absolute inset-0 bg-blend-multiply bg-black/50"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden w-[250px] h-[150px] md:w-[350px] md:h-[250px] md:mr-10 mb-5 md:mb-0">
              <Image src="/images/bbmd3.jpeg" alt="goal1" fill className="object-cover" sizes="(max-width: 768px) 250px, (max-width: 1920px) 350px" />
            </div>

            <p className="md:max-w-[600px] md:w-1/2 text-sm md:text-[16px] leading-7">
              &quot;Hợp tác xã Bồn Bồn Minh Duy đặt mục tiêu tăng sản lượng, đa dạng hóa sản phẩm từ cây bồn bồn và duy trì chất lượng ổn định. Chúng tôi hướng đến nâng cấp sản phẩm đạt chuẩn OCOP 4 sao, đồng thời chú trọng đào tạo, cải thiện tay nghề cho lao động địa phương. Mỗi bước phát triển là sự đầu tư bền vững để sản phẩm ngày càng chuyên nghiệp và có chỗ đứng vững chắc trên thị trường.&quot;
            </p>
          </div>
        </div>

      </div>

      <div className="overflow-hidden relative">
        <div
          className="bg-[url('/images/bbmd4.jpeg')] bg-cover bg-center blur-xs absolute inset-0 bg-blend-multiply bg-black/50"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <p className="md:max-w-[600px] md:w-1/2 text-sm md:text-[16px] leading-7 order-2 md:order-1">
              &quot;Chúng tôi mong muốn mở rộng liên kết với nhiều hộ trồng bồn bồn trong và ngoài tỉnh, từ đó xây dựng vùng nguyên liệu ổn định và cùng nhau phát triển. Hợp tác xã đã và đang đưa sản phẩm ra khắp ba miền đất nước, góp phần lan tỏa giá trị đặc sản địa phương, tạo sinh kế lâu dài và nâng cao thu nhập cho nông dân trong chuỗi sản xuất bền vững.&quot;
            </p>

            <div className="relative rounded-2xl shadow-2xl overflow-hidden w-[250px] h-[150px] md:w-[350px] md:h-[250px] md:ml-10 mb-5 md:mb-0 order-1 md:order-2">
              <Image src="/images/bbmd4.jpeg" alt="goal1" fill className="object-cover" sizes="(max-width: 768px) 250px, (max-width: 1920px) 350px" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default GoalsSection;
