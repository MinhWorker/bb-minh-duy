const HeaderNavItem = ({ name, id }: { name: string, id: string }) => {
  return (
    <li className="transition-colors hover:text-primary">
      <a href={`#${id}`}>{name}</a>
    </li>
  )
}

export default HeaderNavItem;
