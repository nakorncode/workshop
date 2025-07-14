// แสดงส่วนของ page.tsx อื่นๆภายในโฟลเดอร์นี้

import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()
  const nav = [
    { href: '/workshops/1-routing/user', label: 'List' },
    { href: '/workshops/1-routing/user/settings', label: 'Settings' }
  ]
  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-2em)]">
        <nav className="p-3 bg-gray-200 rounded-xl shadow-lg text-gray-800">
          <span className="font-bold">User Manager</span>
          <ul className="inline-flex text-blue-700 underline gap-3 ml-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 my-6 text-gray-600">{children}</main>

        <footer className="bg-gray-800 text-white py-2 px-4 rounded-full">Copyright {year}</footer>
      </div>
    </>
  )
}
