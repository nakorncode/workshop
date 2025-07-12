export default function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className="border border-gray-300 px-2 py-1 rounded w-full"></textarea>
  )
}
