const users = [
  'Anna',
  'Bob',
  'Cindy',
  'David',
  'Ella',
  'Frank',
  'Grace',
  'Hannah',
  'Ian',
  'Jack',
  'Karen',
  'Liam',
  'Mia',
  'Noah',
  'Olivia',
  'Paul',
  'Quinn',
  'Ryan',
  'Sophie',
  'Thomas',
  'Uma',
  'Victor',
  'Wendy',
  'Xavier',
  'Yara',
  'Zane'
]

function randomUser() {
  return users[Math.floor(Math.random() * users.length)]
}

export async function GET() {
  const user = randomUser()
  return Response.json({ user })
}
