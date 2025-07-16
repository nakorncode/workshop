const links: string[] = [
  "/1-routing",
  "/2-components",
  "/3-rendering",
]

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Welcome to the Next.js Workshop</h1>
      <ul className="pl-5 list-disc space-y-1">
        {links.map((link) => (
          <li key={link}>
            <a href={link} className="text-blue-600 underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
