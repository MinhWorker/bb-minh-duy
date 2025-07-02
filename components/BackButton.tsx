import { ArrowBigLeft } from "lucide-react";
import { useRedirect, useTranslate } from "react-admin"

const BackButton = ({ url }: { url: string }) => {
  const translate = useTranslate();
  const redirect = useRedirect();
  return (
    <button
      className="bg-blue-600 flex items-center py-2 p-4 rounded-sm uppercase text-white shadow-md shadow-black/40 text-sm hover:bg-blue-800 gap-2 ml-auto"
      onClick={(e) => {
        e.preventDefault();
        redirect(`/${url}`);
      }}
    >
      <ArrowBigLeft size={20} />
      {translate("ra.action.back")}
    </button >
  )
}

export default BackButton;
