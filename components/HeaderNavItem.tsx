const HeaderNavItem = ({ name, id }: { name: string, id: string }) => {
  return (
    <li className="transition-colors hover:text-primary focus-visible:outline">
      <a href={`#${id}`} aria-label={`Go to ${name} section`}>{name}</a>
    </li >
  )
}

export default HeaderNavItem;
