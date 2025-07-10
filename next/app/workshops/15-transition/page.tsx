import WithoutTransition from './WithoutTransition'
import WithTransition from './WithTransition'

export default function Page() {
  return (
    <>
      <WithoutTransition></WithoutTransition>
      <hr className="my-4" />
      <WithTransition></WithTransition>
    </>
  )
}
