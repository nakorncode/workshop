import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/30-custom-hooks')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <BasicCounter></BasicCounter>
      <hr className="my-4" />
      <BasicTimer></BasicTimer>
      <hr className="my-4"/>
      <UserFetcher></UserFetcher>
      <hr className="my-4"/>
      <TextEditor></TextEditor>
    </>
  )
}

// Custom Hook สำหรับการนับจำนวน และนำไปใช้ซ้ำบน Components ได้ดี
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  function increment(step = 1) {
    setCount(c => c + step)
  }
  function decrement(step = 1) {
    setCount(c => c - step)
  }
  return { count, increment, decrement }
}

interface FetchState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

// Custom Hook สำหรับเรียก API ประยุกต์ใช้ร่วมกับ useEffect() และกำหนด Generic
function useFetch<T = unknown>(url: string) {
  const [state, updateState] = useImmer<FetchState<T>>({
    data: null,
    error: null,
    loading: false
  })
  useEffect(() => {
    updateState(draft => {
      draft.loading = true
    })
    fetch(url)
      .then(res => res.json())
      .then(data => {
        updateState(draft => {
          draft.data = data
          draft.loading = false
        })
      })
      .catch(error => {
        updateState(draft => {
          draft.error = error
          draft.loading = false
        })
      })
  }, [url, updateState])
  function clear() {
    updateState(draft => {
      draft.data = null
      draft.error = null
      draft.loading = false
    })
  }
  return {
    ...state,
    clear
  }
}

// Custom Hook สำหรับการบันทึกข้อมูลและอ่านข้อมูลบน localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })
  useEffect(() => {
    setUpdatedAt(new Date())
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  function remove() {
    localStorage.removeItem(key)
    setValue(initialValue)
  }
  return { value, setValue, remove, updatedAt }
}

// Components
function BasicCounter() {
  const { count, increment, decrement } = useCounter(0)
  return (
    <>
      <p className="mb-1 font-bold">Count: {count}</p>
      <button onClick={() => increment(1)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increase</button>
      <button onClick={() => decrement(1)} className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Decrease</button>
    </>
  )
}

function BasicTimer() {
  const { count, increment } = useCounter(0)
  useEffect(() => {
    const interval = setInterval(() => {
      increment()
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <p className="mb-1 font-bold">Timer: {count}</p>
    </>
  )
}

function UserFetcher() {
  const [currentId, setCurrentId] = useState(1)
  const { data, error, loading, clear } = useFetch<{
    id: number
    firstName: string
    email: string
  }>(`https://dummyjson.com/users/${currentId}?select=firstName,email`)
  function nextPage() {
    clear()
    setCurrentId(currentId + 1)
  }
  return (
    <>
      <p className="mb-1 font-bold">Current User ID: {currentId}</p>
      <button onClick={nextPage} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer mb-2 disabled:opacity-50">Next ID</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <p>First Name: {data.firstName}</p>
          <p>Email: {data.email}</p>
        </>
      )}
    </>
  )
}

function TextEditor() {
  const { value, setValue, remove, updatedAt } = useLocalStorage('content', '')
  function onRemove() {
    const ok = confirm('Are you sure you want to remove this?')
    if (ok) remove()
  }
  return (
    <div>
      <p className="mb-1">Updated At: {updatedAt?.toString()}</p>
      <textarea value={value} onChange={e => setValue(e.target.value)} cols={50} rows={20} className="border border-gray-300 px-2 py-1 rounded"></textarea>
      <div>
        <button onClick={onRemove} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded cursor-pointer">Remove</button>
      </div>
    </div>
  )
}
