import Link from 'next/link'

const links = [
  '/workshops/1-routing/page',
  '/workshops/1-routing/route',
  '/workshops/1-routing/user',
  '/workshops/2-hydration-failed',
  '/workshops/3-server-component',
  '/workshops/4-client-component',
  '/workshops/5-static',
  '/workshops/6-dynamic',
  '/workshops/7-env',
  '/workshops/8-api-endpoints',
  '/workshops/9-request-memoization',
  '/workshops/10-data-cache',
  '/workshops/11-server-functions',
  '/workshops/12-server-actions',
  '/workshops/13-use-action-state',
  '/workshops/14-transition',
  '/workshops/15-built-in-components',
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
