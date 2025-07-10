'use client'

import { Product } from '@/app/api/products/ProductManagement'
import { useEffect, useState } from 'react'

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  async function getProducts() {
    setLoading(true)
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }
  useEffect(() => {
    getProducts()
  }, [])

  const [searchName, setSearchName] = useState('')
  const [searchPriceMin, setSearchPriceMin] = useState<number | null>()
  const [searchPriceMax, setSearchPriceMax] = useState<number | null>()
  async function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const url = new URL('/api/products', window.location.origin)
    if (searchName) url.searchParams.set('name', searchName)
    if (searchPriceMin) url.searchParams.set('priceMin', searchPriceMin.toString())
    if (searchPriceMax) url.searchParams.set('priceMax', searchPriceMax.toString())
    const res = await fetch(url)
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  const [formName, setFormName] = useState('')
  const [formPrice, setFormPrice] = useState<number | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [formUpdateId, setFormUpdateId] = useState<number | null>(null)
  async function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setLoading(true)
    let res
    if (formUpdateId) {
      res = await fetch(`/api/products/${formUpdateId}`, { method: 'PUT', body: JSON.stringify({ name: formName, price: formPrice }) })
    } else {
      res = await fetch('/api/products', { method: 'POST', body: JSON.stringify({ name: formName, price: formPrice }) })
    }
    if (!res.ok) {
      const error = await res.text()
      setFormError(error)
      setLoading(false)
    } else {
      getProducts()
      clearForm()
    }
  }

  async function toggleActiveProduct(id: number) {
    setLoading(true)
    await fetch(`/api/products/${id}/toggle-active`, { method: 'PATCH' })
    getProducts()
  }
  function selectProductToUpdate(product: Product) {
    setFormUpdateId(product.id)
    setFormName(product.name)
    setFormPrice(product.price)
  }
  async function deleteProduct(id: number) {
    setLoading(true)
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    getProducts()
  }
  function clearForm() {
    setFormUpdateId(null)
    setFormName('')
    setFormPrice(null)
    setSearchName('')
    setSearchPriceMin(null)
    setSearchPriceMax(null)
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-2">API Endpoints</h1>
      {loading ? <p>Loading...</p> : <>
        <ul className="list-disc pl-5">
          {products.map(product => <li key={product.id}>
            <span>ID: {product.id} - {product.name} ({product.price})</span>
            <span className="space-x-1">
              <button onClick={() => toggleActiveProduct(product.id)} type="button" className="cursor-pointer">({product.active ? '✅' : '❌'})</button>
              <button onClick={() => selectProductToUpdate(product)} type="button" className="text-blue-600 underline cursor-pointer">Update</button>
              <button onClick={() => deleteProduct(product.id)} type="button" className="text-red-600 underline cursor-pointer">Delete</button>
            </span>
          </li>)}
        </ul>
      </>}

      <hr className="my-4"/>

      <h2 className="text-lg font-bold mb-1">Search Product</h2>
      <form onSubmit={onSearch} className="space-y-2">
        <label className="block">
          <span>Name:</span>
          <input type="text" name="name" value={searchName} onChange={e => setSearchName(e.target.value)} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
        </label>
        <label className="block">
          <span>Price Min:</span>
          <input type="number" name="priceMin" value={searchPriceMin || ''} onChange={e => setSearchPriceMin(Number(e.target.value))} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
        </label>
        <label className="block">
          <span>Price Max:</span>
          <input type="number" name="priceMax" value={searchPriceMax || ''} onChange={e => setSearchPriceMax(Number(e.target.value))} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
        </label>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Search</button>
      </form>

      <hr className="my-4"/>

      <h2 className="text-lg font-bold mb-1">{formUpdateId ? `Update Product (ID: ${formUpdateId})` : 'Add Product'}</h2>
      {formError && <p className="text-red-600 mb-2">{formError}</p>}
      <form onSubmit={onSubmitForm} className="space-y-2">
        <label className="block">
          <span>Name:</span>
          <input type="text" name="name" value={formName} onChange={e => setFormName(e.target.value)} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
        </label>
        <label className="block">
          <span>Price:</span>
          <input type="number" name="price" value={formPrice || ''} onChange={e => setFormPrice(Number(e.target.value))} className="ml-1 border border-gray-300 px-2 py-1 rounded" />
        </label>
        <div className="flex items-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">{formUpdateId ? 'Update' : 'Add'}</button>
          <button type="button" onClick={clearForm} className="ml-2 bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded cursor-pointer">Cancel</button>
        </div>
      </form>
    </>
  )
}
