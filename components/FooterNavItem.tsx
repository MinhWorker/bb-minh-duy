import { MoveRight } from "lucide-react";

const FooterNavItem = ({ name, id }: { name: string, id: string }) => {
  return (
    <li className="my-2 sm:my-1">
      <a
        href={`#${id}`}
        className="text-white/80 flex items-center gap-3 transition-colors hover:text-white"
        aria-label={`Going to ${name} section`}
      >
        {name}
        <MoveRight />
      </a>
    </li>
  )
}

export default FooterNavItem;
