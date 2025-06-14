import './style.css'

// 5. Props จะต้องใช้ชื่อ camelCase
interface UserSettingsProps {
  name: string
  birthDate: Date
  classrooms: string[]
}

// 6. ชื่อไฟล์ Components เช่น UserSettings.tsx ควรใช้ชื่อ export เดียวกัน และเป็น PascalCase
export function UserSettings(props: UserSettingsProps) {
  // 1. จะต้องมี Single Root Element เสมอ (สามารถใช้ Fragment <> ... </> แทน <div> ... </div> ได้)
  // นอกจากนี้ยังแนะนำให้ใช้ Parentheses ที่หมายถึงการครอบวงเล็บ () ระหว่างการเขียน HTML (XML)
  // และทุก Function ที่จะใช้แสดงผล ควรจะต้อง return HTML (XML) ทุกครั้ง
  return (
    <>
      <h1>User Settings</h1>
      {/* 3. HTML Self Closing ต้องใช้ /> ลงท้ายเสมอ */}
      <hr/>
      {/* 2. HTML ให้ใช้ className="" แทน class="" */}
      <p className="font-bold">Name: {props.name.toUpperCase()}</p>
      <p>Birth Date: {props.birthDate.toISOString()}</p>
      <ul>
        {props.classrooms.map((classroom, index) => (
          /* 4. การวนลูปควรแทรก key={index} ไว้เสมอ */
          <li key={index}>{classroom}</li>
        ))}
      </ul>
      {/* 7. HTML `<label for="">` จะต้องใช้ `<label htmlFor="">` */}
      <label htmlFor="name">Username:</label>
      <input type="text" id="name"/>
    </>
  )
}

// Expressions สามารถใช้งานได้ผ่านวงเล็บปีกกา {}
// - หาก HTML Attribute คือ className="" หมายถึงส่งข้อมูล String เท่านั้น
// - หาก HTML Attribute คือ className={} เราจะสามารถส่งข้อมูลประเภทใดก็ได้ตาม JavaScript Expressions

export function MyFooter() {
  const websiteName = 'My Website'
  const copyrightYear = new Date().getFullYear()
  const darkTheme = true
  let footerClass = 'footer'
  if (darkTheme) {
    footerClass += ' dark' // 'footer dark'
  }
  return (
    <footer className={footerClass}>
      <p className="font-bold">Copyright {copyrightYear + 543} {websiteName.toUpperCase()}</p>
    </footer>
  )
}

// การกำหนด style="" สามารถใช้ Object แบบชื่อ Property camelCase
// สำหรับการใช้ style={{}} หมายถึงการแนบ Object {} ลงใน style

export function MainNavigation() {
  const isDarkMode = true
  let navigationStyle = {
    backgroundColor: 'yellow',
    color: 'black'
  }
  if (isDarkMode) {
    navigationStyle = {
      backgroundColor: 'black',
      color: 'white'
    }
  }
  return (
    <>
      {/* style="background-color:black; color:white;" */}
      {/* style={{backgroundColor: 'black', color: 'white'}} */}
      <nav style={navigationStyle}>
        {/* style="display:flex; list-style:none; gap:1rem;" */}
        <ul style={{display: 'flex', listStyle: 'none', gap: '1rem'}}>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </>
  )
}
