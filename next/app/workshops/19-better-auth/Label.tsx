export default function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className="block font-bold text-sm mb-1">{props.children}</label>
  )
}
