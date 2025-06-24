import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/3-props')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <UserProfileProps
        name="John Doe"
        birthDate={new Date('2000-01-01')}
        darkTheme={true}
      ></UserProfileProps>

      <hr className="my-4"/>

      <UserProfileDestructuring
        name="Jane Doe"
        birthDate={new Date('1998-10-14')}
        darkTheme={false}
      ></UserProfileDestructuring>

      <hr className="my-4"/>

      <UserProfileDefault></UserProfileDefault>
    </>
  )
}

interface UserProfileProps {
  name: string
  birthDate: Date
  darkTheme: boolean
}

// กำหนดผ่าน Props แบบไม่ Destructuring
function UserProfileProps(props: UserProfileProps) {
  return (
    <div className={`p-3 rounded-md border border-gray-200 shadow-lg ${props.darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2>Name: {props.name}</h2>
      <p>Birth Date: {props.birthDate.toDateString()}</p>
    </div>
  )
}

// กำหนดผ่าน Props แบบ Destructuring
function UserProfileDestructuring({ name, birthDate, darkTheme }: UserProfileProps) {
  return (
    <div className={`p-3 rounded-md border border-gray-200 shadow-lg ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2>Name: {name}</h2>
      <p>Birth Date: {birthDate.toDateString()}</p>
    </div>
  )
}

// กำหนดค่าเริ่มต้นให้กับ Props
function UserProfileDefault({
  name = '(Unknown)',
  birthDate = new Date(),
  darkTheme = false,
}: Partial<UserProfileProps>) {
  return (
    <div className={`p-3 rounded-md border border-gray-200 shadow-lg ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2>Name: {name}</h2>
      <p>Birth Date: {birthDate.toDateString()}</p>
    </div>
  )
}
