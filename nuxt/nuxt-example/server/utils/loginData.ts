export interface User {
  id: number;
  name: string;
  email: string;
  password: string
}

export const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@me.com', password: '123456' },
  { id: 2, name: 'Jane Doe', email: 'jane@me.com', password: '123456' },
]
