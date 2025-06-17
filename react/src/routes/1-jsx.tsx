import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/1-jsx')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <UserSettings
        name="John Doe"
        birthDate={new Date('2000-01-01')}
        classrooms={['A', 'B', 'C']}
      ></UserSettings>
      <MyFooter></MyFooter>
    </>
  )
}

// 6. Props จะต้องใช้ชื่อ camelCase
interface UserSettingsProps {
  name: string
  birthDate: Date
  classrooms: string[]
}

// 7. ชื่อไฟล์ Components เช่น UserSettings.tsx ควรใช้ชื่อ export เดียวกัน และเป็น PascalCase
export function UserSettings(props: UserSettingsProps) {
  // 1. จะต้องมี Single Root Element เสมอ (สามารถใช้ Fragment <> ... </> แทน <div> ... </div> ได้)
  // นอกจากนี้ยังแนะนำให้ใช้ Parentheses ที่หมายถึงการครอบวงเล็บ () ระหว่างการเขียน HTML (XML)
  // และทุก Function ที่จะใช้แสดงผล ควรจะต้อง return HTML (XML) ทุกครั้ง
  return (
    <>
      {/* 2. HTML ต้องใช้ `className=""` แทนการใช้ `class=""` */}
      <h1 className="font-bold text-2xl">User Settings</h1>

      {/* 4. HTML Self Closing ต้องใช้ /> ลงท้ายเสมอ */}
      <hr className="my-4"/>

      <p className="font-bold">Name: {props.name}</p>
      <p>Birth Date: {props.birthDate.toLocaleDateString()}</p>

      <ul className="list-disc pl-6">
        {props.classrooms.map((classroom, index) => (
          /* 5. การวนลูปควรแทรก key={index} ไว้เสมอ */
          <li key={index}>{classroom}</li>
        ))}
      </ul>

      {/* 3. HTML ต้องใช้ `<label htmlFor="">` แทนการใช้ `<label for="">` */}
      <label htmlFor="name">Username:</label>
      <input className="border rounded ml-1 px-2 py-1" type="text" id="name" value="john123"/>

      {/* 8. `style=""` จะต้องกำหนดเป็นรูปแบบ Object และตามด้วย Property camelCase */}
      <button type="button" style={{ display: 'block', backgroundColor: 'gray', color: 'white', padding: '0.5em 1em', marginTop: '0.5em'}}>Update</button>
    </>
  )
}

// Expressions สามารถใช้งานได้ผ่านวงเล็บปีกกา {}
// - หาก HTML Attribute คือ className="" หมายถึงส่งข้อมูล String เท่านั้น
// - หาก HTML Attribute คือ className={} เราจะสามารถส่งข้อมูลประเภทใดก็ได้ตาม JavaScript Expressions
function MyFooter() {
  const websiteName = 'My Website'
  const copyrightYear = new Date().getFullYear()
  const darkTheme = true
  let footerClass = 'mt-4 text-center p-2 rounded shadow bg-gray-200'
  if (darkTheme) {
    footerClass += ' bg-gray-800 text-white'
  }
  return (
    <footer className={footerClass}>
      <p className="font-bold">&copy; {copyrightYear + 543} {websiteName.toUpperCase()}</p>
    </footer>
  )
}
