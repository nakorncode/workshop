export interface IAttendance {
  when: Date
  userId: number
  status: 'check_in' | 'check_out'
}

export class Attendance {
  static attendances: IAttendance[] = [
    { when: new Date('2025-01-04T08:23:00'), userId: 1, status: 'check_in' },
    { when: new Date('2025-01-04T16:57:00'), userId: 1, status: 'check_out' },
  ]

  static getAll(): IAttendance[] {
    return this.attendances.sort((a, b) => b.when.getTime() - a.when.getTime())
  }

  static getFromUserId(userId: number): IAttendance[] {
    return this.attendances.filter((attendance) => attendance.userId === userId)
  }

  static makeCheckIn(userId: number): IAttendance {
    const data: IAttendance = { when: new Date(), userId, status: 'check_in' }
    this.attendances.push(data)
    return data
  }

  static makeCheckOut(userId: number): IAttendance {
    const data: IAttendance = { when: new Date(), userId, status: 'check_out' }
    this.attendances.push(data)
    return data
  }
}
