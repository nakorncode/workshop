import { test, expect, Page } from '@playwright/test'

const baseUrl = 'http://localhost:5173'
let page: Page

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext()
  page = await context.newPage()
  await page.goto(baseUrl)
})

test('is reachable', async () => {
  expect(page).toBeTruthy()
})

const buttons: { name: string; className: string }[] = [
  { name: 'Button', className: 'font-bold text-white rounded-md cursor-pointer bg-black hover:bg-gray-800 text-base px-4 py-1.5' },
  { name: 'sm', className: 'font-bold text-white rounded-md cursor-pointer bg-black hover:bg-gray-800 text-sm px-3 py-1' },
  { name: 'md', className: 'font-bold text-white rounded-md cursor-pointer bg-black hover:bg-gray-800 text-base px-4 py-1.5' },
  { name: 'lg', className: 'font-bold text-white rounded-md cursor-pointer bg-black hover:bg-gray-800 text-lg px-5 py-2' },
  { name: 'amber', className: 'font-bold text-white rounded-md cursor-pointer bg-amber-700 hover:bg-amber-800 text-base px-4 py-1.5' },
  { name: 'blue', className: 'font-bold text-white rounded-md cursor-pointer bg-blue-700 hover:bg-blue-800 text-base px-4 py-1.5' },
  { name: 'red', className: 'font-bold text-white rounded-md cursor-pointer bg-red-700 hover:bg-red-800 text-base px-4 py-1.5' },
  { name: 'gray', className: 'font-bold text-white rounded-md cursor-pointer bg-gray-700 hover:bg-gray-800 text-base px-4 py-1.5' },
  { name: 'black', className: 'font-bold text-white rounded-md cursor-pointer bg-black hover:bg-gray-800 text-base px-4 py-1.5' },
]

test.describe('MyButton.vue', () => {
  test('should be visible', async () => {
    expect(page.getByText('MyButton.vue')).toBeVisible()
  })
  buttons.forEach((btn) => {
    test(`should be get ${btn.name} button`, async () => {
      const btnEl = await page.getByRole('button', { name: btn.name })
      expect(btnEl).toBeVisible()
      expect(await btnEl.getAttribute('class')).toBe(btn.className)
    })
  })
  test('should be disabled', async () => {
    const btnEl = await page.getByRole('button', { name: 'disabled' })
    expect(btnEl).toBeDisabled()
  })
  test('should be loading', async () => {
    const btnEl = await page.getByRole('button', { name: 'Loading...' })
    expect(btnEl).toBeDisabled()
  })
  test('should be on click', async () => {
    const btnEl = await page.getByRole('button', { name: 'v-on:click' })
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert')
      expect(dialog.message()).toBe('Clicked!')
      await dialog.accept()
    })
    await btnEl.click()
  })
})

test.describe('TodoList.vue & CreateTodo.vue', () => {
  test('should be visible', async () => {
    expect(page.getByText('TodoList.vue')).toBeVisible()
    expect(page.getByText('CreateTodo.vue')).toBeVisible()
  })
  test('should be able to add todo', async () => {
    const todoInput = await page.getByTestId('create-todo-input')
    await todoInput.fill('Test todo')
    await todoInput.press('Enter')
    expect(await page.getByText('Test todo')).toBeVisible()
    expect(await todoInput.inputValue()).toBe('')
  })
  test('should be able to toggle todo', async () => {
    const todoItemToggle = await page.$('[data-testid="todo-item"] > span:first-child')
    if (!todoItemToggle) {
      throw new Error('Todo item toggle not found')
    }
    await todoItemToggle.click()
    expect(await todoItemToggle.textContent()).toBe('✅')
    await todoItemToggle.click()
    expect(await todoItemToggle.textContent()).toBe('❌')
  })
  test('should be able to mark all as done', async () => {
    const markAllAsDone = await page.getByRole('button', { name: 'Mark all as done' })
    await markAllAsDone.click()
    const todoItems = await page.getByTestId('todo-item').all()
    await Promise.all(todoItems.map(async (item) => {
      expect(await item.textContent()).toContain('✅')
    }))
  })
})
