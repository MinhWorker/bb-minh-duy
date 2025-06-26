import { MoveRight } from "lucide-react";

const MobileSidebarNavItem = ({ name, id, icon }: { name: string, id: string, icon: React.ReactNode }) => {
  return (
    <li className="my-2">
      <a
        href={`#${id}`}
        className="flex items-center justify-between text-primary-foreground p-2 active:bg-accent rounded-lg"
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
