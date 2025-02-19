import { Attendance, type IAttendance } from './Attendance.js'

export interface IEmployee {
  id: number
  name: string
  email: string
  role: string
}

export interface IEmployeeWithAttendance extends IEmployee {
  attendances: IAttendance[]
}

export class Employee {
  static _employees: IEmployee[] = [
    { id: 1, name: 'John Doe', email: 'john@me.com', role: 'Developer' },
    { id: 2, name: 'Jane Doe', email: 'jane@me.com', role: 'Developer' },
    { id: 3, name: 'Bob Doe', email: 'bob@me.com', role: 'Lead Developer' },
  ]

  static get employees(): IEmployeeWithAttendance[] {
    return this._employees.map((employee) => ({
      ...employee,
      attendances: Attendance.getFromUserId(employee.id),
    }))
  }

  static getAll(): IEmployeeWithAttendance[] {
    return this.employees
  }

  static getOne(id: number): IEmployeeWithAttendance | undefined {
    return this.employees.find((employee) => employee.id === id)
  }

  static create(employee: Omit<IEmployee, 'id'>): IEmployee {
    const newEmployee = { ...employee, id: this.employees.length + 1 }
    this._employees.push(newEmployee)
    return newEmployee
  }

  static update(id: number, employee: Omit<IEmployee, 'id'>): IEmployee {
    const index = this._employees.findIndex((employee) => employee.id === id)
    if (index === -1) {
      throw new Error('Employee not found')
    }
    this._employees[index] = { ...this._employees[index], ...employee }
    return this._employees[index]
  }

  static delete(id: number): void {
    const index = this._employees.findIndex((employee) => employee.id === id)
    if (index === -1) {
      throw new Error('Employee not found')
    }
    this._employees.splice(index, 1)
  }
}

