const links: string[] = [
  "/1-routing",
  "/2-components",
  "/3-rendering",
  "/4-functions",
  "/5-built-in-components",
  "/6-route-handler",
  "/7-server-function",
  "/8-server-action",
  "/9-server-action-hooks",
  "/10-request-memoization",
  "/11-data-cache",
  "/12-use-cache",
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
