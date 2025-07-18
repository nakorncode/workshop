import Code from "@/components/Code"
import Link from "next/link"
import { Sarabun, Kanit, Itim } from "next/font/google"
import Image from "next/image"
import Form from "next/form"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Radio from "@/components/Radio"

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

      <div className="max-w-xs">
        <Code>&lt;form&gt;</Code>
        <form action="/5-built-in-components/search" className="mt-2 space-y-2">
          <Input id="keyword" label="Keyword" placeholder="Keyword" name="keyword" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Select a category for products</p>
            <div className="space-x-4">
              <Radio id="category-toys" label="Toys" name="category" value="toys" />
              <Radio id="category-books" label="Books" name="category" value="books" />
              <Radio id="category-electronics" label="Electronics" name="category" value="electronics" />
            </div>
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <hr className="my-4"/>

      <div className="max-w-xs">
        <Code>&lt;Form&gt;</Code>
        <Form action="/5-built-in-components/search" className="space-y-2 mt-2">
          <Input id="keyword" label="Keyword" placeholder="Keyword" name="keyword" />
          <div>
            <p className="text-sm text-gray-500 mb-1">Select a category for products</p>
            <div className="space-x-4">
              <Radio id="category-toys" label="Toys" name="category" value="toys" />
              <Radio id="category-books" label="Books" name="category" value="books" />
              <Radio id="category-electronics" label="Electronics" name="category" value="electronics" />
            </div>
          </div>
          <Button type="submit">Search</Button>
        </Form>
      </div>
    </div>
  )
}
