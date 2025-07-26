export const users = [
  { username: 'john', password: '123' },
  { username: 'susan', password: '456' },
  { username: 'bob', password: '789' }
]

export const login = (username: string, password: string) => {
  const user = users.find(user => user.username === username && user.password === password)
  if (user) {
    return { success: true, user }
  } else {
    return { success: false, message: 'Invalid username or password' }
  }
}
