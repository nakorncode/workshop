import { render, fireEvent } from '@testing-library/vue'
import { test, expect } from 'vitest'
import { type TodoItem } from '../types/todo'
import TodoList from './TodoList.vue'

const todoList: TodoItem[] = [
  { title: 'Learn JavaScript', done: false },
  { title: 'Learn TypeScript', done: true },
  { title: 'Learn Vue', done: false }
]

const statusDone = '✅'
const statusNotDone = '❌'

test('should able to render', () => {
  const { getByTestId } = render(TodoList, {
    props: {
      modelValue: todoList
    }
  })
  expect(getByTestId('todo-list')).toBeTruthy()
})

test('should able to render items', () => {
  const { getAllByTestId } = render(TodoList, {
    props: {
      modelValue: todoList
    }
  })
  const todoItem = getAllByTestId('todo-item')
  expect(todoItem.length).toBe(3)
})

test.each(todoList)('should able to render item $title', ({ title }) => {
  const { getByText } = render(TodoList, {
    props: {
      modelValue: todoList
    }
  })
  expect(getByText(title)).toBeTruthy()
})

test.each(todoList)('should able to mark $title as done or not', ({ title, done }) => {
  const { getByText } = render(TodoList, {
    props: {
      modelValue: todoList
    }
  })
  expect(getByText(title).parentElement?.getElementsByTagName('span')[0].textContent).toBe(done ? statusDone : statusNotDone)
})

test.each(todoList)('should able to toggle status on $title', async ({ title, done }) => {
  const { getByText } = render(TodoList, {
    props: {
      modelValue: todoList
    }
  })
  const titleEl = getByText(title)
  const statusEl = titleEl.parentElement?.getElementsByTagName('span')[0]
  if (!statusEl) throw new Error('Status element not found')
  await fireEvent.click(statusEl)
  expect(statusEl.textContent).toBe(done ? statusNotDone : statusDone)
})

test('should able to mark all as done', async () => {
  const { getByText, getAllByText, emitted } = render(TodoList, {
    props: {
      modelValue: todoList
    }
  })
  await fireEvent.click(getByText('Mark all as done'))
  expect(emitted()).toHaveProperty('finished')
  expect(getAllByText(statusDone)).toHaveLength(3)
})
