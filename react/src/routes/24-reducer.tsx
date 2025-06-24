import { createFileRoute } from '@tanstack/react-router'
import { useReducer, useState } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/24-reducer')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LoginAsState></LoginAsState>
      <hr className="my-4"/>
      <LoginAsReducer></LoginAsReducer>
      <hr className="my-4"/>
      <LoginAsImmer></LoginAsImmer>
    </>
  )
}

interface User {
  username: string
  loggedInAt: number
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// จำลองฟังก์ชั่นเข้าสู่ระบบ
async function login(username: string) {
  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long')
  }
  await delay(2000)
  return {
    username,
    loggedInAt: Date.now()
  }
}

// จำลองฟังก์ชั่นการออกจากระบบ
async function logout() {
  await delay(2000)
  return true
}

// Component ที่จะใช้เป็นตัวอย่างร่วมกัน
function LoginForm(props: {
  onLogin: (username: string) => Promise<void>
}) {
  const [usernameInput, setUsernameInput] = useState('')
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.onLogin(usernameInput)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          value={usernameInput}
          onChange={e => setUsernameInput(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <button className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Login</button>
      </form>
    </>
  )
}

// ➡️ ใช้แบบ useState เป็นวิธีที่เรียบง่าย แต่อาจจะจัดการข้อมูลจำนวนมากขึ้น
function LoginAsState() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function handleLogin(username: string) {
    setLoading(true)
    try {
      const user = await login(username)
      setUser(user)
      setError(null)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }
  async function handleLogout() {
    setLoading(true)
    try {
      await logout()
      setUser(null)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user ? (
        <>
          <p>Logged in as {user.username}</p>
          <p>Logged in at {new Date(user.loggedInAt).toString()}</p>
          <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Logout</button>
        </>
      ) : <LoginForm onLogin={handleLogin}></LoginForm>}
    </>
  )
}

// ➡️ ใช้แบบ useImmer เป็นวิธีที่เรียบง่ายเช่นกัน อาจจะมีการควบคุมข้อมูลที่ไม่คงที่
function LoginAsImmer() {
  const [user, updateUser] = useImmer<{
    data: User | null
    error: string | null
    loading: boolean
  }>({
    data: null,
    error: null,
    loading: false
  })
  async function handleLogin(username: string) {
    updateUser(draft => {
      draft.loading = true
    })
    try {
      const user = await login(username)
      updateUser(draft => {
        draft.data = user
        draft.loading = false
        draft.error = null
      })
    } catch (error) {
      updateUser(draft => {
        draft.error = (error as Error).message
        draft.loading = false
      })
    }
  }
  async function handleLogout() {
    updateUser(draft => {
      draft.loading = true
    })
    try {
      await logout()
      updateUser(draft => {
        draft.data = null
        draft.loading = false
      })
    } catch (error) {
      updateUser(draft => {
        draft.error = (error as Error).message
        draft.loading = false
      })
    }
  }
  return (
    <>
      {user.loading && <p>Loading...</p>}
      {user.error && <p>Error: {user.error}</p>}
      {user.data ? (
        <>
          <p>Logged in as {user.data.username}</p>
          <p>Logged in at {new Date(user.data.loggedInAt).toString()}</p>
          <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Logout</button>
        </>
      ) : <LoginForm onLogin={handleLogin}></LoginForm>}
    </>
  )
}

function loginReducer(state: {
  user: User | null
  error: string | null
  loading: boolean
}, action: {
  type: 'login'
  payload: User
} | {
  type: 'loading'
  payload: boolean
} | {
  type: 'logout'
} | {
  type: 'error'
  payload: Error
}) {
  switch (action.type) {
    case 'login':
      return {
        user: action.payload as User,
        error: null,
        loading: false
      }
    case 'logout':
      return {
        user: null,
        error: null,
        loading: false
      }
    case 'error':
      return {
        user: null,
        error: (action.payload as Error).message,
        loading: false
      }
    case 'loading':
      return {
        user: state.user,
        error: state.error,
        loading: action.payload
      }
    default:
      return state
    }
}

// ➡️ ใช้แบบ useReducer จะควบคุม Logic ที่ซับซ้อนได้ดีขึ้น เพียงแต่จะมี Boilerplate Code ที่มากกว่าเดิมอย่างมาก
// (ส่วนหนึ่งผมแนะนำใช้ Custom Hook แทน ที่จะได้เรียนรู้ในบทต่อไปภายหลัง)
function LoginAsReducer() {
  const [user, dispatch] = useReducer(loginReducer, { user: null, error: null, loading: false })
  async function handleLogin(username: string) {
    dispatch({ type: 'loading', payload: true })
    try {
      const user = await login(username)
      dispatch({ type: 'login', payload: user })
    } catch (error) {
      dispatch({ type: 'error', payload: error as Error })
    } finally {
      dispatch({ type: 'loading', payload: false })
    }
  }
  async function handleLogout() {
    dispatch({ type: 'loading', payload: true })
    try {
      await logout()
      dispatch({ type: 'logout' })
    } catch (error) {
      dispatch({ type: 'error', payload: error as Error })
    } finally {
      dispatch({ type: 'loading', payload: false })
    }
  }
  return (
    <>
      {user.loading && <p>Loading...</p>}
      {user.error && <p>Error: {user.error}</p>}
      {user.user ? (
        <>
          <p>Logged in as {user.user.username}</p>
          <p>Logged in at {new Date(user.user.loggedInAt).toString()}</p>
          <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Logout</button>
        </>
      ) : <LoginForm onLogin={handleLogin}></LoginForm>}
    </>
  )
}
