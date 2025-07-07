import ForceCache from './ForceCache'
import NoStore from './NoStore'
import Revalidate5Sec from './Revalidate5Sec'

export default async function Page() {
  return (
    <>
      {/* ไม่มีการ Cache ข้อมูล เหมาะกับเว็บที่มีข้อมูลเปลี่ยนแปลงตลอดเวลา */}
      <NoStore></NoStore>

      {/* บังคับ Cache เหมาะกับข้อมูลที่เปลี่ยนแปลงไม่บ่อยครั้ง และควรใช้ revalidatePath(), revalidateTag() เพื่ออัปเดตข้อมูลใหม่อีกครั้ง */}
      <ForceCache></ForceCache>

      {/* Revalidate แบบทุกช่วงเวลา เหมาะกับข้อมูลที่อาจจะเปลี่ยนแปลงเป็นช่วงระยะ แต่ไม่เปลี่ยนแปลงตลอดเวลา */}
      <Revalidate5Sec></Revalidate5Sec>
    </>
  )
}
