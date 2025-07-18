export default function Pre(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <pre {...props} className={`bg-gray-200 border border-gray-400 p-3 rounded-md block mt-1 ${props.className || ""}`}>
      <code className="text-sm">{props.children}</code>
    </pre>
  )
}
