import type { FC } from 'hono/jsx'
import { LayoutApp } from '../layouts/LayoutApp.js'
import type { IEmployeeWithAttendance } from '../models/Employee.js'
import { AttendanceCheckButton } from '../components/AttendanceCheckButton.js'

export const ViewHome: FC<{ employees: IEmployeeWithAttendance[] }> = (props) => {
  return (
    <LayoutApp>
      <h1>Home</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Attendances Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map(employee => (
            <tr key={employee.id}>
              <td><a href={`/employees/${employee.id}`}>{employee.name}</a></td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.attendances.length}</td>
              <th>
                <AttendanceCheckButton employeeId={employee.id}></AttendanceCheckButton>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutApp>
  )
}
