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
        className={`fixed sm:hidden inset-0 bg-black/50 bg-opacity-50 z-40 transition-opacity duration-300 ${isShown ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={hide}
      >
        <aside
          className={`fixed top-0 left-0 h-full w-3/4 p-3 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isShown ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 relative aspect-square">
              <Image src="/images/logo.png" alt="BB Minh Duy logo" fill objectFit="cover" />
            </div>
            <p className="font-gwendolyn text-primary text-xl font-semibold">BB Minh Duy</p>
            <div onClick={hide} className="w-10">
              <X />
            </div>
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
