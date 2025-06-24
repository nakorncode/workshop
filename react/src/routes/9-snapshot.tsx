import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/9-snapshot')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <IncorrectSnapshot></IncorrectSnapshot>

      <hr className="my-4"/>

      <CorrectSnapshot></CorrectSnapshot>

      <hr className="my-4"/>

      <BadProductFetcher></BadProductFetcher>

      <hr className="my-4"/>

      <GoodProductFetcher></GoodProductFetcher>

      <hr className="my-4"/>

      <BetterProductFetcher></BetterProductFetcher>
    </>
  )
}

// ใช้งานผิด (แต่ก็ไม่ได้แปลว่าเราจะจำเป็นต้องใช้ Callback ทุกครั้ง เฉพาะกรณีที่เราเรียกซ้ำซ้อนเท่านั้น)
function IncorrectSnapshot() {
  const [count, setCount] = useState(0)
  function incrementOnce() {
    setCount(count + 1) // ✅ จาก 1 --> 2 ปกติ
  }
  function incrementTwice() {
    setCount(count + 1) // จาก 1 --> 2 ปกติ
    setCount(count + 1) // ❌ จาก 1 --> 2 อีกรอบ?
  }
  return (
    <div>
      <p className="mb-1">(Incorrect) Count: {count}</p>
      <button onClick={incrementOnce} className="mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +1</button>
      <button onClick={incrementTwice} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +2</button>
    </div>
  )
}

// ใช้งานถูกต้อง
function CorrectSnapshot() {
  const [count, setCount] = useState(0)
  function incrementOnce() {
    setCount(count + 1) // ✅ จาก 1 --> 2 ปกติ
  }
  function incrementTwice() {
    setCount(count => count + 1) // จาก 1 --> 2 ปกติ
    setCount(count => count + 1) // ✅ จาก 2 --> 3 ได้ เพราะ Async Code ที่รันทีหลังจาก Callback
  }
  return (
    <div>
      <p className="mb-1">(Correct) Count: {count}</p>
      <button onClick={incrementOnce} className="mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +1</button>
      <button onClick={incrementTwice} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +2</button>
    </div>
  )
}

interface ProductItem {
  title: string
  description: string
  price: number
}

// หากคลิกเร็วเกินไป อาจจะทำให้เกิด Snapshot ผิดพลาดได้
function BadProductFetcher() {
  const [id, setId] = useState(1)
  const [product, setProduct] = useState<ProductItem | null>(null)
  async function fetchDataAndIncreaseId() {
    const response = await fetch(`https://dummyjson.com/products/${id}?select=title,description,price`)
    const data = await response.json()
    setProduct(data)
    // เมื่อกดคลิกเร็วมากเกินไป อาจจะทำให้หมายเลข ID กลับไปกลับมาได้ เพราะการ Snapshot จะดูจากสถานะก่อนหน้าทั้งหมด
    // เนื่องจากหลังทำงานเสร็จจึงจะ setId() เพิ่มหนึ่งหน่วย ดังนั้นถ้ามีบางหน้าเว็บทำงานช้าไป จะทำให้เลขกลับไปมาได้
    // นอกจากนี้ยังติดปัญหาที่ await ก่อนหน้า อาจจะทำงานช้าจนเลขไม่ทันได้ setId อีกด้วย
    setId(id + 1)
  }
  return (
    <>
      <h1>(Bad) Next Product ID: {id}</h1>
      {!product && <p>Wait for data...</p>}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
      <button onClick={fetchDataAndIncreaseId} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Get data</button>
    </>
  )
}

function GoodProductFetcher() {
  const [id, setId] = useState(1)
  const [product, setProduct] = useState<ProductItem | null>(null)
  async function fetchDataAndIncreaseId() {
    // แก้ไขปัญหา Snapshot data ดังนั้นคลิกเร็วแค่ไหน จำนวนหน้าก็จะเป็นหน้าล่าสุดเสมอ
    // และสั่งให้ทำงานก่อน await เพื่อป้องกันเรื่อง async ทำงานไม่ทัน
    setId((id) => id + 1)
    const response = await fetch(`https://dummyjson.com/products/${id}?select=title,description,price`)
    const data = await response.json()
    setProduct(data)
  }
  return (
    <>
      <h1>(Good) Next Product ID: {id}</h1>
      {!product && <p>Wait for data...</p>}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
      <button onClick={fetchDataAndIncreaseId} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Get data</button>
    </>
  )
}


function BetterProductFetcher() {
  const [id, setId] = useState(1)
  const [product, setProduct] = useState<ProductItem | null>(null)
  // เพิ่มตัวแปร loading ช่วยรองรับการโหลดของข้อมูล และห้ามโหลดซ้ำซ้อนเพื่อป้องกันปัญหา async function
  const [loading, setLoading] = useState(false)
  async function fetchDataAndIncreaseId() {
    if (loading) return
    setLoading(true)
    setId((id) => id + 1)
    const response = await fetch(`https://dummyjson.com/products/${id}?select=title,description,price`)
    const data = await response.json()
    setProduct(data)
    setLoading(false)
  }
  return (
    <>
      <h1>(Better) Next Product ID: {id}</h1>
      {!product && <p>Wait for data...</p>}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
      <button disabled={loading} onClick={fetchDataAndIncreaseId} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">Get data</button>
    </>
  )
}
