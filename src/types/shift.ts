export interface User {
  id: string
  name: string
  surname: string
  email: string
}

export interface CreateShiftPayload {
  officeName: string
  startTime: string
  endTime: string
  isActive: boolean
}

export interface Shift {
  id: string
  officeName: string
  startTime: string
  endTime: string
  isActive: boolean
}

export interface ShiftPage {
  content: Shift[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export interface ShiftToUpdatePayload {
  officeName: string
  startTime: string
  endTime: string
  isActive: boolean
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
  tasks: string[]
}

export interface ShiftTask {
  id: string
  title?: string
  description?: string
  shiftAssignment?: ShiftAssignment
}

export interface AttendanceStatus {
  ON_TIME?: string
  LATE?: string
  ABSENT: string
  COMPLETED: string
  EARLY_DEPARTURE: string
}

export interface Clocking {
  id: string
  actualStartTime?: string
  actualEndTime?: string
  workedMinutes?: number
  workedHours?: number
  officeName?: string
  note?: string
  attendanceStatus?: AttendanceStatus
}
