export interface TodoItem {
  id: string
  text: string
  completed: boolean
}

export interface Todo {
  id: string
  title: string
  items: TodoItem[]
}
