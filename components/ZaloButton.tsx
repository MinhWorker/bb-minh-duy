"use client";

import Image from "next/image";
import Link from "next/link";

const ZaloButton = () => {
  const zaloNumber = "0948055359";
  const defaultMessage = "Chào HTX Minh Duy, tôi muốn được tư vấn";
  const zaloUrl = `https://zalo.me/${zaloNumber}`;

  return (
    <Link
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2"
    >
      <div className="bg-white text-primary px-4 py-2 rounded-full shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
        {defaultMessage}
      </div>
      <div className="w-14 h-14 bg-[#0068ff] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce hover:animate-none">
        <Image
          src="/images/zalo-icon.svg"
          alt="Zalo Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>
    </Link>
  );
};

export default ZaloButton;
