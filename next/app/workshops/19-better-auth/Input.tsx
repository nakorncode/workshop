export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="border border-gray-300 px-2 py-1 rounded" />
  )
}
