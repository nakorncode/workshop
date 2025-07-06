'use server'

const fruits = [
  'apple',
  'banana',
  'cherry',
  'date',
  'elderberry',
  'fig',
  'grape',
  'honeydew',
  'kiwi',
  'lemon',
  'mango',
  'nectarine',
  'orange',
  'papaya',
  'quince',
  'raspberry',
  'strawberry',
  'tangerine',
  'watermelon',
  'yuzu',
  'zucchini'
]

// Simulate a delay
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function listFruits(previousState: any, formData: FormData): Promise<{ data: string[], error?: string}> {
  await delay(2000)
  const keyword = formData.get('search') as string | null
  if (keyword) {
    return {
      data: fruits.filter(fruit => fruit.toLowerCase().includes(keyword.toLowerCase()))
    }
  }
  return {
    data: fruits
  }
}
