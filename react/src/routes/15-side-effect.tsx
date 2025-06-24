import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/15-side-effect')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NavbarController />
    </>
  )
}

function NavbarController() {
  const [title, setTitle] = useState('My Website')
  const [navList, setNavList] = useImmer<string[]>(['Home', 'About', 'Contact'])
  useEffect(() => {
    document.title = title
    console.log('Setting new title:', title)
  }, [title])
  return (
    <>
      <p className="mb-1 font-bold">Set title:</p>
      <input value={title} onChange={e => setTitle(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />

      <hr className="my-4" />

      <p className="mb-1 font-bold">Set nav list:</p>
      <ul className="list-disc pl-5 mb-2">
        {navList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input value={navList.join(',')} onChange={e => setNavList(e.target.value.split(','))} className="w-full border border-gray-300 px-2 py-1 rounded" />
    </>
  )
}
