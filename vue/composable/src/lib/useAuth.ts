import { ref } from 'vue'

export interface User {
  id: number
  username: string
  password: string
}

const userData: User[] = [
  { id: 1, username: 'john', password: '123' },
  { id: 2, username: 'bob', password: '123' }
]

const user = ref<User | null>(null)

export function useAuth() {
  const login = (username: string, password: string) => {
    const foundUser = userData.find((user) => user.username === username && user.password === password)
    if (!foundUser) {
      throw new Error('Invalid username or password')
    }
    user.value = foundUser
    localStorage.setItem('user', JSON.stringify(foundUser))
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const getSession = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    login,
    logout,
    getSession
  }
}
