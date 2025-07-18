export default function Code(props: React.HTMLAttributes<HTMLElement>) {
  return <code {...props} className={`inline-block bg-gray-700 text-white rounded-md py-1 px-2 ${props.className || ""}`}>{props.children}</code>
}
