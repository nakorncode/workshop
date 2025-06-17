import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/4-children')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      {/* แนะนำวิธีนี้ */}
      <SimpleCard>
        <p>This is a simple card</p>
      </SimpleCard>

      {/* วิธีการส่งข้อมูลแบบปกติ */}
      <SimpleCard children={<p>This is a simple card</p>} />

      {/* ส่งแบบ Props ผสมกับ children */}
      <CardWithHeader header={
        <>
          <h1 className="font-bold text-lg">Title</h1>
        </>
      }>
        <p>This is card with header</p>
      </CardWithHeader>

      <CardWithHeader header={
        <>
          <h1 className="font-mono uppercase text-2xl">Title</h1>
        </>
      }>
        <p>This is card with header</p>
      </CardWithHeader>
    </>
  )
}

function SimpleCard(props: { children: ReactNode }) {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-4">
      {props.children}
    </div>
  )
}

function CardWithHeader(props: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="shadow border border-gray-200 rounded-md mb-4">
      <div className="px-3 py-1 bg-gray-200 rounded-t-md">
        {props.header}
      </div>
      <div className="p-3">
        {props.children}
      </div>
    </div>
  )
}
