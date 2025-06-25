import AboutUsSection from "../../components/AboutUsSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import ScreenSizeDetector from "../../components/ScreenWidthIndicator";

export default function Home() {
  return (
    <main>
      <Header />
      <MobileSidebar />

      <AboutUsSection />

      <div className="h-[500px]">Hello</div>

      <Footer />

      <ScreenSizeDetector />
    </main>
  );
}
