import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hello new title',
  description: 'Hello new description',
  keywords: 'hello, nextjs, workshop',
  openGraph: {
    title: 'Hello new title',
    description: 'Hello new description',
    images: '/branding5.webp',
  }
}

export default function Page() {
  return (
    <h1 className="text-xl font-bold mb-2">Metadata</h1>
  )
}
