import { createFileRoute } from '@tanstack/react-router'
import { createContext, useContext, useState, type ReactNode } from 'react'

export const Route = createFileRoute('/27-ui-component')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = [
    { name: 'Alice', email: 'alice@mail.com', birthDate: '1999-01-01' },
    { name: 'Bob', email: 'bob@mail.com', birthDate: '2000-01-01' },
    { name: 'Charlie', email: 'charlie@mail.com', birthDate: '2001-01-01' },
  ]
  const [showBirthDate, setShowBirthDate] = useState(false)
  return (
    <div>
      <button onClick={() => setShowBirthDate(!showBirthDate)} className="mb-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">{showBirthDate ? 'Hide Birth Date' : 'Show Birth Date'}</button>
      <Table data={data} >
        <Table.Header>
          <Table.Row>
            <Table.Column>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            {showBirthDate && <Table.Column>Birth Date</Table.Column>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(row, i) => (
            <Table.Row key={i}>
              <Table.Column className="font-bold">{row.name}</Table.Column>
              <Table.Column>{row.email}</Table.Column>
              {showBirthDate && <Table.Column>{row.birthDate}</Table.Column>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

interface TableData {
  data: { [key: string]: string }[]
}

const TableContext = createContext<TableData>({ data: [] })

// กำหนดให้ Component <Table> มี Context ที่แชร์กันใช้งานสำหรับ Sub-component ภายในได้หลากหลาย
function Table(props: TableData & { children: ReactNode }) {
  return (
    <TableContext.Provider value={{ data: props.data }}>
      <table className="w-full border border-collapse">{props.children}</table>
    </TableContext.Provider>
  )
}

Table.Header = function Header(props: { children: ReactNode }) {
  return (
    <thead className="bg-gray-200">{props.children}</thead>
  )
}

Table.Body = function Body(props: { children: ReactNode | ((row: TableData['data'][number], rowIndex: number) => ReactNode) }) {
  const { data } = useContext(TableContext)
  return (
    <tbody>
      {data.map((row, i) => (typeof props.children === 'function' ? props.children(row, i) : props.children))}
    </tbody>
  )
}

Table.Row = function Row(props: { children: ReactNode }) {
  return <tr className="border-t">{props.children}</tr>
}

Table.Column = function Column(props: { children: ReactNode; className?: string; colSpan?: number }) {
  return <td className={`p-2 ${props.className ?? ''}`} colSpan={props.colSpan}>{props.children}</td>
}
