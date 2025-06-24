import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/7-event')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ButtonWithEvent>Try me</ButtonWithEvent>
      <hr className="my-4" />
      <BadBasicForm></BadBasicForm>
      <hr className="my-4" />
      <GoodBasicForm></GoodBasicForm>
    </>
  )
}

function ButtonWithEvent(props: { children: React.ReactNode }) {
  function handleClick() {
    console.log('Clicked')
  }
  function handleEnter() {
    console.log('Mouse entered')
  }
  function handleLeave() {
    console.log('Mouse left')
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-9 rounded cursor-pointer">
      {props.children}
    </button>
  )
}

function BadBasicForm() {
  function handleSubmit() {
    alert(`Form submitted: ${(document.getElementById('badData') as HTMLInputElement).value}`)
  }
  return (
    <>
      <input id="badData" type="text" className="border border-gray-300 px-2 py-1 rounded mb-1" />
      <button type="button" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Submit</button>
    </>
  )
}

function GoodBasicForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    alert(`Form submitted: ${(event.currentTarget.elements.namedItem('goodData') as HTMLInputElement).value}`)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="goodData" type="text" className="border border-gray-300 px-2 py-1 rounded mb-1" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Submit</button>
      </form>
    </>
  )
}
