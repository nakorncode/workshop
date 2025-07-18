export default function Radio(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="inline-block">
      <input
        type="radio"
        {...props}
      />
      {props.label && <label htmlFor={props.id} className="inline-block ml-1">{props.label}</label>}
    </div>
  )
}
