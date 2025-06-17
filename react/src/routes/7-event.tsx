import { createFileRoute } from '@tanstack/react-router'
import type { FormEventHandler, KeyboardEventHandler } from 'react'

export const Route = createFileRoute('/7-event')({
  component: RouteComponent,
})

function RouteComponent() {
  function handleClick() {
    console.log('Input clicked!')
  }

  const handleSubmitted: FormEventHandler<HTMLFormElement> = (event) => {
    // ใช้เพื่อป้องกันส่งแบบฟอร์ม และเกิดการ Request HTTP ออกไป
    event.preventDefault()
    console.log('Form submitted!', `Data received: ${event.currentTarget.querySelector('input')?.value}`)
  }

  const onInputChanged: FormEventHandler<HTMLInputElement> = (event) => {
    console.log('Input changed:', event.currentTarget.value)
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    console.log('Input keydown:', event.key)
  }

  return (
    // ในการเรียก on* ต่างๆ ระวังการใช้ onSubmit={handleSubmitted()} เพราะคือการเรียกใช้ Function ทันที
    <form onSubmit={handleSubmitted}>
      <input
        className="border border-gray-300 px-2 py-1 rounded"
        type="text"
        onClick={handleClick}
        onInput={onInputChanged}
        onKeyDown={onKeyDown}
      />
      <div className="mt-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">Submit</button>
      </div>
    </form>
  )
}
