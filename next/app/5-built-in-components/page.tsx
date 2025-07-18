import Code from "@/components/Code"
import Link from "next/link"
import { Sarabun, Kanit, Itim } from "next/font/google"
import Image from "next/image"
import Form from "next/form"
import Input from "@/components/Input"
import Button from "@/components/Button"

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
})

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
})

const itim = Itim({
  subsets: ["thai", "latin"],
  weight: ["400"],
})

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Built-in Components</h1>

      <p className="font-bold mb-1"><Code>&lt;a href=""&gt;</Code></p>
      <ul className="list-disc pl-5 space-y-1">
        <li><a href="/5-built-in-components/page-a" className="underline text-blue-600">Page A</a></li>
        <li><a href="/5-built-in-components/page-b" className="underline text-blue-600">Page B</a></li>
        <li><a href="/5-built-in-components/hydrate-ok" className="underline text-blue-600">Hydrate OK</a></li>
        <li><a href="/5-built-in-components/hydrate-error" className="underline text-blue-600">Hydrate Error</a></li>
      </ul>

      <p className="font-bold mb-1 mt-4"><Code>&lt;Link href=""&gt;</Code></p>
      <ul className="list-disc pl-5 space-y-1">
        <li><Link href="/5-built-in-components/page-a" className="underline text-blue-600">Page A</Link></li>
        <li><Link href="/5-built-in-components/page-b" className="underline text-blue-600">Page B</Link></li>
        <li><Link href="/5-built-in-components/hydrate-ok" className="underline text-blue-600">Hydrate OK</Link></li>
        <li><Link href="/5-built-in-components/hydrate-error" className="underline text-blue-600">Hydrate Error</Link></li>
      </ul>

      <hr className="my-4"/>

      <p className="text-2xl mt-3">ภาษาไทย</p>
      <p className={`text-2xl mt-3 ${sarabun.className}`}>ภาษาไทย</p>
      <p className={`text-2xl mt-3 ${kanit.className}`}>ภาษาไทย</p>
      <p className={`text-2xl mt-3 ${itim.className}`}>ภาษาไทย</p>

      <hr className="my-4"/>

      <div>
        <Code className="mb-2">&lt;img /&gt;</Code>
        <img src="/images/pexels-chevonrossouw-2558605.jpg" alt="A cat" width="640" height="427" />
      </div>
      <div className="mt-5">
        <Code className="mb-2">&lt;Image /&gt;</Code>
        <Image src="/images/pexels-chevonrossouw-2558605.jpg" alt="A cat" width={640} height={427} />
      </div>

      <hr className="my-4"/>

      <div>
        <Code>&lt;form&gt;</Code>
        <form action="/5-built-in-components/search" className="mt-2 space-y-2">
          <Input placeholder="Keyword" name="keyword" />
          <div className="space-x-3">
            <label>
              <input type="radio" name="category" value="toys" className="mr-2" />
              <span>Toys</span>
            </label>
            <label>
              <input type="radio" name="category" value="books" className="mr-2" />
              <span>Books</span>
            </label>
            <label>
              <input type="radio" name="category" value="electronics" className="mr-2" />
              <span>Electronics</span>
            </label>
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <hr className="my-4"/>

      <div>
        <Code>&lt;Form&gt;</Code>
        <Form action="/5-built-in-components/search" className="space-y-2 mt-2">
          <Input placeholder="Keyword" name="keyword" />
          <div className="space-x-3">
            <label>
              <input type="radio" name="category" value="toys" className="mr-2" />
              <span>Toys</span>
            </label>
            <label>
              <input type="radio" name="category" value="books" className="mr-2" />
              <span>Books</span>
            </label>
            <label>
              <input type="radio" name="category" value="electronics" className="mr-2" />
              <span>Electronics</span>
            </label>
          </div>
          <Button type="submit">Search</Button>
        </Form>
      </div>
    </div>
  )
}
