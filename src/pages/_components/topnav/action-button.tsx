export default function ActionButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="topnav__action-btn" {...props}>
      {children}
    </button>
  )
}
