"use client";
import { Menu } from "lucide-react"
import { useSidebarStore } from "../hooks/store";

const MobileSidebarToggle = () => {
  const toggle = useSidebarStore((state) => state.show);

  return (
    <>
      <div
        className="block sm:hidden hover:cursor-pointer"
        onClick={toggle}
      ><Menu /></div>
    </>
  )
}

export default MobileSidebarToggle;
