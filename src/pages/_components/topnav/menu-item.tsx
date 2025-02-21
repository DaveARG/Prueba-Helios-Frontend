import ArrowDown from "@/assets/svg/arrow-down"

interface MenuItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  withArrow?: boolean
  propsSvg?: React.SVGProps<SVGSVGElement>
  href: string
}

export default function MenuItem({
  isActive,
  withArrow,
  propsSvg,
  href,
  children,
  ...props
}: MenuItemProps) {
  return (
    <a
      className={`topnav__menu-item ${isActive ? " active" : ""}`}
      href={href}
      {...props}
    >
      {children}
      {withArrow && (
        <ArrowDown className="topnav__menu-item-arrow_down" {...propsSvg} />
      )}
    </a>
  )
}
