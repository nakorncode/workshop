import Link from 'next/link'

const links = [
  '/workshops/1-routing/page',
  '/workshops/1-routing/route',
  '/workshops/1-routing/user',
  '/workshops/2-metadata/',
  '/workshops/3-hydration-failed',
  '/workshops/4-server-component',
  '/workshops/5-client-component',
  '/workshops/6-static',
  '/workshops/7-dynamic',
  '/workshops/8-env',
  '/workshops/9-api-endpoints',
  '/workshops/10-request-memoization',
  '/workshops/11-data-cache',
  '/workshops/12-server-functions',
  '/workshops/13-server-actions',
  '/workshops/14-use-action-state',
  '/workshops/15-transition',
  '/workshops/16-built-in-components',
]

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Welcome to Next.js Workshop</h1>
      <ul className="list-disc pl-5 space-y-2">
        {links.map((link) => <li key={link}><Link href={link} className="underline text-blue-600">{link}</Link></li>)}
      </ul>
    </>
  )
}
