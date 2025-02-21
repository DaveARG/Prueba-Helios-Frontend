export default function Job(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      {...props}
    >
      <path d="M8.8 11.2H7.2c-.44 0-.8-.36-.8-.8H.808v3.2c0 .88.72 1.6 1.6 1.6H13.6c.88 0 1.6-.72 1.6-1.6v-3.2H9.6c0 .44-.36.8-.8.8ZM14.4 4h-3.2a3.2 3.2 0 1 0-6.4 0H1.6C.72 4 0 4.72 0 5.6V8c0 .888.712 1.6 1.6 1.6h4.8v-.8c0-.44.36-.8.8-.8h1.6c.44 0 .8.36.8.8v.8h4.8c.88 0 1.6-.72 1.6-1.6V5.6c0-.88-.72-1.6-1.6-1.6Zm-8 0c0-.88.72-1.6 1.6-1.6.88 0 1.6.72 1.6 1.6H6.392 6.4Z" />
    </svg>
  )
}
