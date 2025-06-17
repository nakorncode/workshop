import { createFileRoute } from '@tanstack/react-router'
import { produce } from 'immer'
import { useState, type InputHTMLAttributes } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/11-immer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [numbers1, setNumbers1] = useState<number[]>([])
  const [numbers2, updateNumbers2] = useImmer<number[]>([])
  // วิธีแบบที่ React ปกติจะใช้งาน
  function reactAddNumber() {
    setNumbers1([...numbers1, numbers1.length + 1])
  }
  // วิธีที่ใช้ Immer ช่วยลดความซับซ้อน
  function immerAddNumber() {
    setNumbers1(produce((draft) => {
      draft.push(draft.length + 1)
    }))
  }
  // วิธีที่ใช้ useImmer() ช่วยลดความซับซ้อน (ต้องใช้แทน useState())
  function useImmerAddNumber() {
    updateNumbers2((draft) => {
      draft.push(draft.length + 1)
    })
  }

  const [person1, setPerson1] = useState({ name: 'John Doe', age: 30, location: { country: 'United States', province: 'New York' } })
  const [person2, updatePerson2] = useImmer({ name: 'John Doe', age: 30, location: { country: 'United States', province: 'New York' } })
  function reactIncreaseAge() {
    setPerson1({ ...person1, age: person1.age + 1 })
  }
  function immerIncreaseAge() {
    setPerson1(produce((draft) => {
      draft.age += 1
    }))
  }
  function useImmerIncreaseAge() {
    updatePerson2((draft) => {
      draft.age += 1
    })
  }
  const reactOnChangeCountry: InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    setPerson1({ ...person1, location: { ...person1.location, country: event.target.value } })
  }
  const useImmerOnChangeCountry: InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    updatePerson2((draft) => {
      draft.location.country = event.target.value
    })
  }

  return (
    <>
      <p>Hex numbers (1): {numbers1.map((n) => n.toString(16)).join(', ')}</p>
      <p>Hex numbers (2): {numbers2.map((n) => n.toString(16)).join(', ')}</p>
      <div className="flex gap-1 items-center flex-wrap mt-2">
        <button onClick={reactAddNumber} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">React add number (1)</button>
        <button onClick={immerAddNumber} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Immer.produce() add number (1)</button>
        <button onClick={useImmerAddNumber} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">useImmer() add number (2)</button>
      </div>

      <hr className="my-4" />

      <p>User (1) {person1.name} - {person1.age} ({person1.location.country} - {person1.location.province})</p>
      <p>User (2) {person2.name} - {person2.age} ({person2.location.country} - {person2.location.province})</p>
      <div className="space-y-2 mt-2">
        <button onClick={reactIncreaseAge} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">React increase age (1)</button>
        <button onClick={immerIncreaseAge} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Immer.produce() increase age (1)</button>
        <button onClick={useImmerIncreaseAge} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">useImmer() increase age (2)</button>
        <div>
          <label>
            <span>Country (1):</span>
            <input type="text" value={person1.location.country} onChange={reactOnChangeCountry} className="border border-gray-300 px-2 py-1 rounded"/>
          </label>
        </div>
        <div>
          <label>
            <span>Country (2):</span>
            <input type="text" value={person2.location.country} onChange={useImmerOnChangeCountry} className="border border-gray-300 px-2 py-1 rounded"/>
          </label>
        </div>
      </div>
    </>
  )
}
