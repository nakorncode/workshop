import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/8-state')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Counter></Counter>

      <hr className="my-4"/>

      <Collapse>
        <div>Content</div>
      </Collapse>

      <hr className="my-4"/>

      <InputName></InputName>

      <hr className="my-4"/>

      <ProductData></ProductData>
    </>
  )
}

function Counter() {
  // useState จะ return [value, setValue] โดยเราสามารถตั้งชื่อส่วนนี้ได้อิสระ
  const [count, setCount] = useState(0)
  // ส่วนนี้เราจะพบว่ามีการ log สองครั้ง จะพูดถึงในบทแก้ไข Side Effect อีกที
  console.log('Render with count value:', count)
  return (
    <div>
      <p>Count: {count}</p>
      {/* เมื่อ setCount() ถูกเรียกใช้งาน จะเกิดการ Re-render Component หรือก็คือสั่งรัน Function นี้ใหม่ทั้งหมด */}
      <button onClick={() => setCount(count + 1)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer mt-1">Increment</button>
    </div>
  )
}

function Collapse(props: { children: React.ReactNode }) {
  // จะใช้ Initial value แบบใดก็ได้ เช่น Boolean
  const [show, setShow] = useState(false)
  function toggleShow() {
    setShow(!show)
  }
  return (
    <div>
      <button type="button" onClick={toggleShow} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">{show ? 'Hide' : 'Show'}</button>
      {show && props.children}
    </div>
  )
}

function InputName() {
  const [name, setName] = useState('')
  return (
    <>
      <h1>Name: {name}</h1>
      {/* 2 Way binding คือการเชื่อมข้อมูลทั้ง Input & Output พร้อมกัน ทำให้ข้อมูลเปลี่ยนแปลงและแสดงผลได้พร้อมกัน */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded mt-1" />
      <button type="button" onClick={() => setName('John')} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 cursor-pointer rounded ml-1">Set name to 'John'</button>
    </>
  )
}

interface ProductInfo {
  name: string
  price: number
  isVisible: boolean
}

function ProductData() {
  // สามารถกำหนด Types ผ่านทาง Generic เพื่อบอกประเภทข้อมูลที่สามารถเปลี่ยนแปลงได้
  const [product, setProduct] = useState<ProductInfo>({
    name: 'Product A',
    price: 100,
    isVisible: true
  })
  return (
    <>
      <ul className="list-disc pl-5">
        <li>Name: {product.name}</li>
        <li>Price: {product.price.toLocaleString()}</li>
        <li>Visible: {product.isVisible ? '✅' : '❌'}</li>
      </ul>

      {/* กรณีที่ต้องการเปลี่ยนแปลง Object เนื่องจากเป็น Reference Types จำเป็นต้องใช้ Spread Operator ที่จะได้เรียนรู้เชิงลึกอีกที */}
      <div className="space-y-2 mt-3">
        <div>
          <label>
            <span className="mr-1">Name:</span>
            <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })}  className="border border-gray-300 px-2 py-1 rounded"/>
          </label>
        </div>
        <div>
          <label>
            <span className="mr-1">Price:</span>
            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="border border-gray-300 px-2 py-1 rounded"/>
          </label>
        </div>
        <div>
          <label>
            <span className="mr-1">Is visible?</span>
            <input id="isVisible" type="checkbox" checked={product.isVisible} onChange={(e) => setProduct({ ...product, isVisible: e.target.checked })}/>
          </label>
        </div>
      </div>
    </>
  )
}
