export interface HolidayRequestDTO {
  startDate: string
  endDate: string
  employeeNotes?: string
}

export type LeaveHoursType =
  | "ROL"
  | "LAW_104"
  | "STUDY_LEAVE"
  | "BLOOD_DONATION_LEAVE"
  | "BEREAVEMENT_LEAVE"
  | "PERSONAL_LEAVE"
  | "MEDICAL_APPOINTMENT"

export interface LeaveHoursRequestDTO {
  date: string
  startTime: string
  endTime: string
  leaveHoursType?: LeaveHoursType
  employeeNotes?: string
}

export type CertificateType =
  | "SICKNESS"
  | "MATERNITY"
  | "PATERNITY"
  | "PARENTAL_LEAVE"

export interface AbsenceCertificationRequestDTO {
  protocolCode: string
  startDate: string
  endDate: string
  issueDate: string
  certificateFile: File
  certificateType: CertificateType
  employeeNotes?: string
}

export type RequestStatus = "SENT" | "APPROVED" | "REJECTED" | "CANCELLED"

export interface HolidayRequestResponse {
  id: string
  startDate: string
  endDate: string
  employeeNotes?: string
  createdAt: string
  requestStatus: RequestStatus
  reviewerNotes?: string
}

export interface LeaveHoursRequestResponse {
  id: string
  date: string
  startTime: string
  endTime: string
  leaveHoursType: LeaveHoursType
  employeeNotes?: string
  createdAt: string
  requestStatus: RequestStatus
  reviewerNotes?: string
}

export interface AbsenceCertificationResponse {
  id: string
  protocolCode: string
  startDate: string
  endDate: string
  totalDays: number
  issueDate: string
  certificateUrl: string
  certificateType: CertificateType
  requestStatus: RequestStatus
  createdAt: string
  employeeNotes?: string
  reviewerNotes?: string
}

export interface UpdateCertificationRequestDTO {
  protocolCode?: string
  startDate?: string
  endDate?: string
  issueDate?: string
  certificateFile?: File
  certificateType?: CertificateType
  employeeNotes?: string
}

export interface UpdateHolidayRequestDTO {
  startDate?: string
  endDate?: string
  employeeNotes?: string
}

export interface UpdateLeaveHoursRequestDTO {
  date?: string
  startTime?: string
  endTime?: string
  leaveHoursType?: LeaveHoursType
  employeeNotes?: string
}
