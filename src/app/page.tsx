import AboutUsSection from "../../components/AboutUsSection";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import ScreenSizeDetector from "../../components/ScreenWidthIndicator";

export default function Home() {
  return (
    <main className="bg-blue-300">
      <Header />
      <MobileSidebar />

      <AboutUsSection />

      <div className="h-[500px]">Hello</div>

      <ScreenSizeDetector />
    </main>
  );
}
