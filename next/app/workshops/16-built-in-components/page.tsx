'use client'

import Form from 'next/form'
import { Kanit } from 'next/font/google'
import Image from 'next/image'
import productSearchImg from '@/assets/Improve-Product-Search-in-WooCommerce.png'

const kanit = Kanit({
  weight: ['400', '700'],
  display: 'swap'
})

export default function Page() {
  return (
    <>
      <div className={kanit.className}>
        <h1 className="text-xl font-bold mb-2">Built-in Components</h1>
        <Image src={productSearchImg} alt="Product Search Image" width={400}></Image>
        <Form action="/workshops/15-built-in-components/products" className="mt-3">
          <input type="text" name="search" className="border border-gray-300 px-2 py-1 rounded" />
          <button className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">ค้นหา</button>
        </Form>
      </div>
    </>
  )
}
