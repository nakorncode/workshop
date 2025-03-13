import { render } from '@testing-library/vue'
import { test, expect } from 'vitest'
import MyButton from './MyButton.vue'

test('should able to render', () => {
  const { getByRole } = render(MyButton)
  expect(getByRole('button')).toBeTruthy()
})

test('should able to click', () => {
  const { getByRole, emitted } = render(MyButton)
  getByRole('button').click()
  expect(emitted()).toHaveProperty('click')
})

test('should able to render loading', () => {
  const { getByRole } = render(MyButton, {
    props: {
      loading: true
    }
  })
  expect(getByRole('button').textContent).toBe('Loading...')
})

test('should able to render disabled', () => {
  const { getByRole } = render(MyButton, {
    props: {
      disabled: true
    }
  })
  expect(getByRole('button').getAttribute('disabled')).not.toBeNull()
})

const colors: { received: string, expected: string }[] = [
  { received: 'black', expected: 'bg-black hover:bg-gray-800' },
  { received: 'gray', expected: 'bg-gray-700 hover:bg-gray-800' },
  { received: 'blue', expected: 'bg-blue-700 hover:bg-blue-800' },
  { received: 'red', expected: 'bg-red-700 hover:bg-red-800' },
  { received: 'amber', expected: 'bg-amber-700 hover:bg-amber-800' },
]

test.each(colors)('should able to render color $received', ({ received, expected }) => {
  const { getByRole } = render(MyButton, {
    props: {
      color: received
    }
  })
  expect(getByRole('button').getAttribute('class')).toContain(expected)
})

const sizes: { received: string, expected: string }[] = [
  { received: 'sm', expected: 'text-sm px-3 py-1' },
  { received: 'md', expected: 'text-base px-4 py-1.5' },
  { received: 'lg', expected: 'text-lg px-5 py-2' },
]

test.each(sizes)('should able to render size $received', ({ received, expected }) => {
  const { getByRole } = render(MyButton, {
    props: {
      size: received
    }
  })
  expect(getByRole('button').getAttribute('class')).toContain(expected)
})

test('should able to render text', () => {
  const { getByRole } = render(MyButton, {
    slots: {
      default: 'Hello World'
    }
  })
  expect(getByRole('button').textContent).toBe('Hello World')
})
