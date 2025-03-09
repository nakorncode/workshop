<script setup lang="ts">
import { h, ref, defineEmits, defineProps, watchEffect } from 'vue'
import { type TodoItem } from '../types'

const props = defineProps<{
  todoList: TodoItem[]
}>()
const emit = defineEmits<{
  'update:todoList': [data: TodoItem[]]
  'allFinished': []
}>()

const todoList = ref(props.todoList)
const newTodo = ref('')

function onAddTodoItem(event: Event) {
  event.preventDefault()
  if (newTodo.value.trim()) {
    todoList.value.push({ text: newTodo.value.trim(), done: false })
    newTodo.value = ''
    emit('update:todoList', todoList.value)
  }
}

function toggleStatusTodoItem(index: number) {
  todoList.value[index].done = !todoList.value[index].done
  emit('update:todoList', todoList.value)
}

function deleteTodoItem(index: number) {
  todoList.value.splice(index, 1)
  emit('update:todoList', todoList.value)
}

watchEffect(() => {
  if (todoList.value.every(item => item.done)) {
    emit('allFinished')
  }
})

function renderTodoItem(item: TodoItem, index: number) {
  return h('li', { key: index }, [
    h('div', { class: 'flex items-center gap-2' }, [
      h(
        'button',
        {
          type: 'button',
          class: ['btn-sm', item.done ? '!bg-green-100' : '!bg-red-100'],
          onClick: () => toggleStatusTodoItem(index),
        },
        item.done ? '✅' : '❌'
      ),
      h('span', item.text),
      h(
        'button',
        {
          class: 'btn-sm',
          type: 'button',
          onClick: () => deleteTodoItem(index),
        },
        'Remove'
      ),
    ]),
  ])
}

function render() {
  return h('div', [
    h(
      'ul',
      {
        class: 'list-disc pl-6 mb-3 space-y-1',
      },
      todoList.value.map(renderTodoItem)
    ),
    h(
      'p',
      {
        class: 'text-gray-500 italic',
        style: { display: todoList.value.length === 0 ? 'block' : 'none' },
      },
      'No todo found'
    ),
    h(
      'form',
      {
        class: 'flex gap-2',
        onSubmit: onAddTodoItem,
      },
      [
        h('input', {
          type: 'text',
          value: newTodo.value,
          onInput: (event: Event) => newTodo.value = ((event.target) as HTMLInputElement).value,
          placeholder: 'Please enter a todo',
        }),
        h('button', { type: 'submit' }, 'Add'),
      ]
    ),
  ])
}
</script>

<template>
  <component :is="render"></component>
</template>
