import { MoveRight } from "lucide-react";

const MobileSidebarNavItem = ({ name, id, icon }: { name: string, id: string, icon: React.ReactNode }) => {
  return (
    <li className="my-2">
      <a
        href={`#${id}`}
        className="flex items-center justify-between text-foreground p-3 active:bg-secondary rounded-xl transition-colors"
        aria-label={`Going to ${name} section`}
      >
        <div className="flex items-center gap-3">
          {icon}
          {name}
        </div>
        <MoveRight />
      </a>
    </li>
  )
}

export default MobileSidebarNavItem;
