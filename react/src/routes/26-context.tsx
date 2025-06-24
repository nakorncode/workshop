import { createFileRoute } from '@tanstack/react-router'
import { createContext, useContext, useState } from 'react'

const btnClass = 'mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer'

export const Route = createFileRoute('/26-context')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <App1></App1>
      <hr className="my-4" />
      <App2></App2>
    </>
  )
}

type SupportLanguages = 'th' | 'en' | 'jp'

function LanguageSwitcher1(props: { setLanguage: (language: SupportLanguages) => void }) {
  return <>
    <button onClick={() => props.setLanguage('th')} className={btnClass}>TH</button>
    <button onClick={() => props.setLanguage('en')} className={btnClass}>EN</button>
    <button onClick={() => props.setLanguage('jp')} className={btnClass}>JP</button>
  </>
}

function DisplayHello1(props: { language: SupportLanguages }) {
  if (props.language === 'th') return <p>สวัสดี</p>
  if (props.language === 'en') return <p>Hello</p>
  if (props.language === 'jp') return <p>こんにちは</p>
}

function DisplayCurrentLanguage1(props: { language: SupportLanguages }) {
  if (props.language === 'th') return <p>(ภาษาไทย)</p>
  if (props.language === 'en') return <p>(English)</p>
  if (props.language === 'jp') return <p>(日本語)</p>
}

function DisplayContent1(props: { language: SupportLanguages }) {
  return (
    <>
      <div className="mt-1">
        <DisplayHello1 language={props.language}></DisplayHello1>
        <DisplayCurrentLanguage1 language={props.language}></DisplayCurrentLanguage1>
      </div>
    </>
  )
}

// ⚠️ ตัวอย่างปัญหาของ Props Drilling คือมีการส่ง language > MainContent > DisplayCurrentLanguage
// ทำให้เราต้องประกาศรับ Props ส่งต่อจนกว่าจะถึง Grandchild ซึ่งเสียเวลาการทำโค้ดซ้ำซ้อนอย่างมาก
function App1() {
  const [language, setLanguage] = useState<SupportLanguages>('th')
  return (
    <>
      <LanguageSwitcher1 setLanguage={setLanguage}></LanguageSwitcher1>
      <DisplayContent1 language={language}></DisplayContent1>
    </>
  )
}


// ✅ สร้าง Context สำหรับการส่งข้อมูลข้าม Component ได้ทั่วถึงมากขึ้น
// โดยจะส่งชุด State เพื่อให้สามารถเรียกใช้งานที่ Component ใดก็ได้ และไม่จำเป็นต้อง Props Drilling อีกต่อไป
const LanguageContext = createContext<{
  language: SupportLanguages
  setLanguage: (language: SupportLanguages) => void
}>({
  language: 'th',
  setLanguage: () => {}
})

function LanguageSwitcher2() {
  const { setLanguage } = useContext(LanguageContext)
  return <>
    <button onClick={() => setLanguage('th')} className={btnClass}>TH</button>
    <button onClick={() => setLanguage('en')} className={btnClass}>EN</button>
    <button onClick={() => setLanguage('jp')} className={btnClass}>JP</button>
  </>
}

function DisplayHello2() {
  const { language } = useContext(LanguageContext)
  if (language === 'th') return <p>สวัสดี</p>
  if (language === 'en') return <p>Hello</p>
  if (language === 'jp') return <p>こんにちは</p>
}

function DisplayCurrentLanguage2() {
  const { language } = useContext(LanguageContext)
  if (language === 'th') return <p>(ภาษาไทย)</p>
  if (language === 'en') return <p>(English)</p>
  if (language === 'jp') return <p>(日本語)</p>
}

function DisplayContent2() {
  return (
    <>
      <div className="mt-1">
        <DisplayHello2></DisplayHello2>
        <DisplayCurrentLanguage2></DisplayCurrentLanguage2>
      </div>
    </>
  )
}

function App2() {
  const [language, setLanguage] = useState<SupportLanguages>('th')
  return (
    <LanguageContext.Provider value={{ language, setLanguage }} >
      <LanguageSwitcher2></LanguageSwitcher2>
      <DisplayContent2></DisplayContent2>
    </LanguageContext.Provider>
  )
}
