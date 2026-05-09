import AboutUsSection from "../../components/AboutUsSection";
import Footer from "../../components/Footer";
import GoalsSection from "../../components/GoalsSection";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import ProceduresSection from "../../components/ProceduresSection";
import ProductsSection from "../../components/ProductsSection";
import CookGuideSection from "../../components/CookGuideSection";
import ZaloButton from "../../components/ZaloButton";
import StoryCard from "../../components/StoryCard";
import MetricsSection from "../../components/MetricsSection";
import Hero from "../../components/Hero";

export default function Home() {

  return (
    <main className="overflow-x-hidden">
      <Header />
      
      <Hero />

      <MobileSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductsSection />

        <MetricsSection />
        
        <div className="my-16">
          <StoryCard 
            title="Chuyện về cây bồn bồn Cà Mau"
            content="Cây bồn bồn không chỉ là nguồn sống, mà còn là linh hồn của vùng đất Tân Hưng Đông. Mỗi hũ dưa bồn bồn là tâm huyết của những người bà, người mẹ Cà Mau, gửi gắm hương vị phù sa mặn nồng vào từng sợi dưa trắng nõn."
            image="/images/bbmd2.jpeg"
          />
        </div>
      </div>

      <AboutUsSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-16">
          <StoryCard 
            title="Giá trị cộng đồng"
            content="Chúng tôi tin rằng nông nghiệp sạch không chỉ bảo vệ sức khỏe người dùng mà còn là con đường bền vững để nâng cao đời sống cho bà con nông dân địa phương."
            image="/images/bbmd3.jpeg"
          />
        </div>

        <GoalsSection />
      </div>

      <ProceduresSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CookGuideSection />
      </div>

      <Footer />

      <ZaloButton />
    </main>
  );
}
