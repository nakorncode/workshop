import Link from 'next/link'

const links = [
  '/workshops/1-hydration-failed',
  '/workshops/2-server-component',
  '/workshops/3-client-component',
  '/workshops/4-static',
  '/workshops/5-dynamic',
  '/workshops/6-dynamic-route-segment/posts/hello-world',
  '/workshops/7-env',
  '/workshops/8-api-endpoints',
  '/workshops/9-request-memoization',
  '/workshops/10-data-cache',
  '/workshops/11-server-functions',
  '/workshops/12-server-actions',
  '/workshops/13-use-action-state',
  '/workshops/14-bind-server-functions',
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
