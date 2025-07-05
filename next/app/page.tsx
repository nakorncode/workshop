import Link from 'next/link'

const links = [
  '/workshops/1-hydration-failed',
  '/workshops/2-server-component',
  '/workshops/3-client-component',
  '/workshops/4-static',
  '/workshops/5-dynamic',
  '/workshops/6-server-functions',
]

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Welcome to Next.js Workshop</h1>
      <ul className="list-disc pl-5">
        {links.map((link) => <li key={link}><Link href={link} className="underline text-blue-600">{link}</Link></li>)}
      </ul>
    </>
  )
}
