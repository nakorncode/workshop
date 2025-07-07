'use client'

export function Button(props: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <>
      <button type="button" onClick={props.onClick} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">{props.children}</button>
    </>
  )
}
