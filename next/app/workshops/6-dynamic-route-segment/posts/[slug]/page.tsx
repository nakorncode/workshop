import SomeClientComponent from './SomeClientComponent'

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Dynamic Route Segment</h1>
      <p>Slug (Server Component): {params.slug}</p>
      <SomeClientComponent params={props.params}></SomeClientComponent>
    </>
  )
}
