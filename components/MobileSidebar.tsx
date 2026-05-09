"use client";
import { useEffect } from "react";
import { useSidebarStore } from "../hooks/store"
import { Box, Flag, Info, Phone, Workflow, X } from "lucide-react";
import Image from "next/image";
import MobileSidebarNavItem from "./MobileSideBarNavItem";

const MobileSidebar = () => {
  const { isShown, hide } = useSidebarStore();

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    }
  }, [isShown]);

  return (
    <>
      <div
        className={`z-100 fixed sm:hidden inset-0 bg-black/50 bg-opacity-50 transition-opacity duration-300 ${isShown ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={hide}
      >
        <aside
          className={`fixed top-0 left-0 h-full w-3/4 p-3 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isShown ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 relative aspect-square">
              <Image src="/images/logo.png" alt="BB Minh Duy logo" fill className="object-cover" sizes="40px" />
            </div>
            <p className="font-gwendolyn text-foreground text-2xl font-bold">BB Minh Duy</p>
            <button onClick={hide} className="p-2 text-foreground">
              <X size={24} />
            </button>
          </div>

          <nav className="mt-5">
            <ul>
              <MobileSidebarNavItem name="Về chúng tôi" id="aboutus" icon={<Info />} />
              <MobileSidebarNavItem name="Sản phẩm" id="products" icon={<Box />} />
              <MobileSidebarNavItem name="Mục tiêu" id="goals" icon={<Flag />} />
              <MobileSidebarNavItem name="Quy trình" id="procedures" icon={<Workflow />} />
              <MobileSidebarNavItem name="Liên hệ" id="contact" icon={<Phone />} />
            </ul>
          </nav>
        </aside>
      </div>
    </>
  )
}

export default MobileSidebar;
