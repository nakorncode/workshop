import type { FC } from 'hono/jsx'
import { LayoutApp } from '../layouts/LayoutApp.js'
import type { IEmployeeWithAttendance } from '../models/Employee.js'
import { AttendanceCheckButton } from '../components/AttendanceCheckButton.js'

export const ViewEmployee: FC<{ employee: IEmployeeWithAttendance }> = (props) => {
  return (
    <LayoutApp>
      <h1>Employee ID: {props.employee.id}</h1>

      <ul>
        <li>Name: {props.employee.name}</li>
        <li>Email: {props.employee.email}</li>
        <li>Role: {props.employee.role}</li>
      </ul>

      <AttendanceCheckButton employeeId={props.employee.id} redirectURL={`/employees/${props.employee.id}`}></AttendanceCheckButton>

      <table border={1}>
        <thead>
          <tr>
            <th>When</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.employee.attendances.map((attendance) => (
            <tr>
              <td>{attendance.when.toISOString()}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutApp>
  )
}
