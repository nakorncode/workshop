export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="w-full border border-gray-300 px-2 py-1 rounded outline-none focus:ring-2 focus:ring-blue-600" />
  )
}
