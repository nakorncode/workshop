'use server'

export interface User {
  name: string
  birthDate: Date
}

const users: User[] = [
  { name: 'John Doe', birthDate: new Date('1996-01-01') },
  { name: 'Bob Smith', birthDate: new Date('1997-12-12') },
]

async function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function listUser() {
  await simulateDelay(3000)
  return users
}

export async function addUser(user: User) {
  await simulateDelay(3000)
  users.push(user)
}
