import { render, fireEvent } from '@testing-library/vue'
import { test, expect } from 'vitest'
import CreateTodo from './CreateTodo.vue'

test('should able to render', () => {
  const { getByTestId } = render(CreateTodo)
  expect(getByTestId('create-todo')).toBeTruthy()
})

test('should able to create todo', async () => {
  const { getByTestId, emitted } = render(CreateTodo)
  const input = getByTestId('create-todo-input') as HTMLInputElement
  const button = getByTestId('create-todo-button')
  fireEvent.update(input, 'Learn Vue')
  await fireEvent.click(button)
  const { created } = emitted()
  expect(created).toBeTruthy()
  expect(created?.[0]?.[0]).toEqual({ title: 'Learn Vue', done: false })
})
