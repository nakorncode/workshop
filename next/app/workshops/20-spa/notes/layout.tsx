export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto">{props.children}</div>
  )
}
