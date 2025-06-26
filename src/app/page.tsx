import AboutUsSection from "../../components/AboutUsSection";
import Footer from "../../components/Footer";
import GoalsSection from "../../components/GoalsSection";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import ScreenSizeDetector from "../../components/ScreenWidthIndicator";

export default function Home() {

  return (
    <main>
      <Header />

      <MobileSidebar />

      <AboutUsSection />

      <div className="h-[200px] bg-green-100">
        Product section
      </div>

      <GoalsSection />

      <Footer />

      <ScreenSizeDetector />
    </main>
  );
}
