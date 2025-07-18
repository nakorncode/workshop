export default function Code(props: { children?: React.ReactNode }) {
  return <code className="bg-gray-700 text-white rounded-md py-1 px-2">{props.children}</code>
}
