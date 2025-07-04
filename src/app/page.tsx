import AboutUsSection from "../../components/AboutUsSection";
import Footer from "../../components/Footer";
import GoalsSection from "../../components/GoalsSection";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import ProceduresSection from "../../components/ProceduresSection";
import ProductsSection from "../../components/ProductsSection";

export default function Home() {

  return (
    <main>
      <Header />

      <MobileSidebar />

      <AboutUsSection />

      <ProductsSection />

      <GoalsSection />

      <ProceduresSection />

      <Footer />

    </main>
  );
}
