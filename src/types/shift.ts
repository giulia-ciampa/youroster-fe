export interface User {
  id: string
  name: string
  surname: string
  email: string
}

export interface Shift {
  id: string
  startTime: string
  endTime: string
  office?: {
    id: string
    name: string
  }
}
export interface ShiftAssignment {
  id: string
  userId: string
  roleNames: string[]
  userName: string
  userSurname: string
  userEmail: string
  officeName: string
  startTime: string
  endTime: string
  shiftDate: string
  assignmentType: string
}

export interface ShiftTask {
  id: string
  title?: string
  description?: string
  shiftAssignment?: ShiftAssignment
}

export interface Clocking {
  id: string
  actualStartTime?: string
  actualEndTime?: string
  attendanceStatus?: string
  workedMinutes?: number
  workedHours?: number
}
