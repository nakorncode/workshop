export default function Pre(props: { children?: React.ReactNode }) {
  return (
    <pre className="bg-gray-200 border border-gray-400 p-3 rounded-md block mt-1">
      <code className="text-sm">{props.children}</code>
    </pre>
  )
}
