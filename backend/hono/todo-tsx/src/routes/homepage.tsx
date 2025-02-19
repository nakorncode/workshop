import { Hono } from 'hono'
import storeAuth from '../middleware/storeAuth.js'
import { ShowNotification } from '../components/ShowNotification.js'
import prisma from '../prisma.js'
import mustAuth from '../middleware/mustAuth.js'
import { makeNotification } from '../utils/notification.js'
import { zValidator } from '../utils/zValidator.js'
import { z } from 'zod'
import { auth } from '../auth.js'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

app.get('/', storeAuth, async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.redirect('/login')
  }
  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    include: { items: true }
  })
  return c.render(
    <>
      <div className="container" style={{ maxWidth: '560px' }}>
        <h1 className="mt-4">Todo</h1>
        <hr />
        <ShowNotification context={c}></ShowNotification>
        <p className="mt-3">Hello, {user.name}, <a href="/logout">Logout</a></p>
        <hr />
        {!todos && <p>No todo found</p>}
        {todos && (
          <>
            {todos.map((todo) => (
              <div className="shadow mb-3 p-4 rounded-3" key={todo.id}>
                <div>
                  <h3>{todo.title}</h3>
                  <p className="mt-2">{todo.description}</p>
                  <ul>
                    {todo.items.map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                  </ul>
                  <form action={`/add-item/${todo.id}`} method="post">
                    <div className="row g-2 mb-3">
                      <div className="col">
                        <input type="text" className="form-control" id="title" name="title" placeholder="Please input item" required />
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Add Item</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </>
        )}
        <hr />
        <form action="/create" method="post" className="p-3 shadow-lg rounded">
          <h2 className="fs-4 mb-3">Create New Todo</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows={3}></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Create Todo</button>
        </form>
      </div>
    </>
  )
})

const createTodoValidator = zValidator(z.object({
  title: z.string({ message: 'Title is required' }).min(1, { message: 'Title is required' }),
  description: z.string({ message: 'Description is required' })
}))

app.post('/create', mustAuth, createTodoValidator, async (c) => {
  const data = await c.req.valid('form')
  const user = c.get('user')
  await prisma.todo.create({
    data: {
      userId: user.id,
      title: data.title,
      description: data.description
    }
  })
  makeNotification(c, ['Todo created successfully'])
  return c.redirect('/')
})

const createTodoItemValidator = zValidator(z.object({
  title: z.string({ message: 'Title is required' }).min(1, { message: 'Title is required' })
}))

app.post('/add-item/:todoId', mustAuth, createTodoItemValidator, async (c) => {
  const data = await c.req.valid('form')
  const todoId = c.req.param('todoId')
  const user = c.get('user')
  const checkOwn = await prisma.todo.count({
    where: {
      id: todoId,
      userId: user.id
    }
  })
  if (checkOwn === 0) {
    throw new HTTPException(403, { message: 'Forbidden' })
  }
  await prisma.todoItem.create({
    data: {
      todoId,
      title: data.title
    }
  })
  makeNotification(c, ['Item added successfully'])
  return c.redirect('/')
})

app.get('/logout', mustAuth, async (c) => {
  const res = await auth.api.signOut({
    headers: c.req.raw.headers,
    asResponse: true
  })
  res.headers.set('Set-Cookie', res.headers.get('Set-Cookie') ?? '')
  makeNotification(c, ['Logout successful'])
  return c.redirect('/login')
})

export default app
