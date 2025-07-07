interface Post {
  id: number
  title: string
  content: string
}

const posts: Post[] = [
  { id: 1, title: 'Post 1', content: 'Content 1' },
  { id: 2, title: 'Post 2', content: 'Content 2' },
  { id: 3, title: 'Post 3', content: 'Content 3' }
]

export async function getPosts() {
  return posts
}

export async function addPost(post: Omit<Post, 'id'>) {
  posts.push({ ...post, id: posts[posts.length - 1].id + 1 })
}

export async function updatePost(id: number, post: Omit<Post, 'id'>) {
  const index = posts.findIndex(post => post.id === id)
  if (index !== -1) {
    posts[index] = { ...post, id }
  }
}

export async function deletePost(id: number) {
  const index = posts.findIndex(post => post.id === id)
  if (index !== -1) {
    posts.splice(index, 1)
  }
}
