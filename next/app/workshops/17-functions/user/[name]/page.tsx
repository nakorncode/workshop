import { notFound } from 'next/navigation'
import ClientComponent from './ClientComponent'
import ServerComponent from './ServerComponent'

export default async function Page(props: { params: Promise<{ name: string }> }) {
  const params = await props.params
  if (params.name === 'not-found') {
    return notFound()
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Functions</h1>
      <ClientComponent></ClientComponent>
      <hr className="my-4"/>
      <ServerComponent></ServerComponent>
    </>
  )
}
