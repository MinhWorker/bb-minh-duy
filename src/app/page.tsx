import AboutUsSection from "../../components/AboutUsSection";
import Footer from "../../components/Footer";
import GoalsSection from "../../components/GoalsSection";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import ProductsSection from "../../components/ProductsSection";
// import ScreenSizeDetector from "../../components/ScreenWidthIndicator";

export default function Home() {

  return (
    <main>
      <Header />

      <MobileSidebar />

      <AboutUsSection />

      <ProductsSection />

      <GoalsSection />

      <Footer />

      {/* <ScreenSizeDetector /> */}
    </main>
  );
}
