import { ref } from 'vue'

export interface ProductItem {
  id: number
  name: string
  price: number
  quantity: number
}

const carts = ref<ProductItem[]>([])

export function useCart() {
  const add = (item: ProductItem) => {
    const existingItem = carts.value.find((cart) => cart.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      carts.value.push(item)
    }
  }

  const remove = (id: number) => {
    const index = carts.value.findIndex((cart) => cart.id === id)
    if (index !== -1) {
      carts.value.splice(index, 1)
    }
  }

  return {
    carts,
    add,
    remove
  }
}
