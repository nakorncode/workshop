import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/2-components')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ProductItemFC name="Product A" price={10}></ProductItemFC>
      <hr className="my-4"/>
      <ProductItemClass name="Product A" price={10}></ProductItemClass>
    </>
  )
}

interface ProductItemProps {
  name: string
  price: number
}

// Function Component
function ProductItemFC(props: ProductItemProps) {
  const [cartCount, setCartCount] = useState(0)
  return (
    <>
      <h2 className="text-lg font-bold">{props.name}</h2>
      <p className="text-gray-600">Price: {props.price}</p>
      <div className="mt-2 flex items-center gap-2">
        <button onClick={() => setCartCount(cartCount + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
        <p>Cart Count: {cartCount} (Total: {cartCount * props.price})</p>
      </div>
    </>
  )
}

// Class Component
interface ProductItemState {
  cartCount: number
}

class ProductItemClass extends React.Component<ProductItemProps, ProductItemState> {
  constructor(props: ProductItemProps) {
    super(props)
    this.state = {
      cartCount: 0,
    }
  }

  handleAddToCart = () => {
    this.setState((prevState) => ({
      cartCount: prevState.cartCount + 1,
    }))
  }

  render() {
    const { name, price } = this.props
    const { cartCount } = this.state

    return (
      <>
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">Price: {price}</p>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={this.handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
          <p>Cart Count: {cartCount} (Total: {cartCount * price})</p>
        </div>
      </>
    )
  }
}
