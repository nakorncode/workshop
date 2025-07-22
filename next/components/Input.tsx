export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div>
      {props.label && <label htmlFor={props.id} className="block mb-1 font-bold">{props.label}:</label>}
      <input
        {...props}
        className={`w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ""}`}
      />
    </div>
  )
}
