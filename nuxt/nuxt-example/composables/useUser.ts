export interface User {
  id: number
  name: string
  email: string
}

export function useUser() {
  const user = useState<User | null>('user', () => null)

  async function login(data: { email: string, password: string }) {
    try {
      await $fetch('/api/login', {
        method: 'POST',
        body: data
      })
      await getCurrentUser()
      alert('Login successful!')
    } catch (error) {
      alert('Login failed!')
    }
  }

  async function logout() {
    try {
      await $fetch('/api/logout', {
        method: 'POST'
      })
      user.value = null
      alert('Logout successful!')
    } catch (error) {
      alert('Logout failed!')
    }
  }

  async function getCurrentUser() {
    const fetch = useRequestFetch()
    try {
      const { data } = await fetch('/api/me') // headers from nuxt
      user.value = data
    } catch (error) {
      user.value = null
    }
  }
  
  return {
    user,
    login,
    logout,
    getCurrentUser
  }
}