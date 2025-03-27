<script setup lang="ts">
const { getTodo } = useTodo()

const props = defineProps<{
  todo: TodoList
}>()

const currentTodo = getTodo(props.todo.id)

function onToggleItem(id: string, value: boolean | 'indeterminate') {
  if (value === 'indeterminate') {
    return
  }
  if (value) {
    currentTodo.markItemDone(id)
  } else {
    currentTodo.markItemUndone(id)
  }
}
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="item in currentTodo.todo.items" :key="item.id">
      <!-- <UCheckbox :model-value="item.done" @update:model-value="(value) => onToggleItem(item.id, value)"> -->
      <UCheckbox :model-value="item.done" @update:model-value="onToggleItem(item.id, $event)">
        <template #label>
          <span :class="{ 'line-through text-gray-400': item.done }">{{ item.title }}</span>
        </template>
      </UCheckbox>
    </li>
  </ul>
</template>
