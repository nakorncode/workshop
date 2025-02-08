export interface User {
  id: number
  name: string
  email: string
  birthDate: Date
  role: string
}

export const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@me.com', birthDate: new Date('1990-01-01'), role: 'ADMIN' },
  { id: 2, name: 'Jane Doe', email: 'jane@me.com', birthDate: new Date('1991-12-22'), role: 'USER' },
  { id: 3, name: 'Bob Doe', email: 'bob@me.com', birthDate: new Date('1992-06-15'), role: 'USER' },
]
