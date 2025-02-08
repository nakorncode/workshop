import type { FC } from 'hono/jsx'

export const AttendanceCheckButton: FC<{ employeeId: number; redirectURL?: string }> = (props) => {
  return (
    <>
      <div style="display: flex; gap: 0.5em;">
        <form action={`/attendances/check-in/${props.employeeId}?redirect=${props.redirectURL || '/'}`} method="post">
          <button>Check In</button>
        </form>
        <form action={`/attendances/check-out/${props.employeeId}?redirect=${props.redirectURL || '/'}`} method="post">
          <button>Check Out</button>
        </form>
      </div>
    </>
  )
}
