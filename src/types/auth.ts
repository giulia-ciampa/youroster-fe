// ==========================
// REGISTRATION
// ==========================

export interface RegisterPayload {
  name: string
  surname: string
  taxCode: string
  dateOfBirth: string
  placeOfBirth: string
  nationality: string
  phoneNumber: string
  streetAddress: string
  houseNumber: string
  zipCode: string
  city: string
  province: string
  referenceOfficeId?: number | null
  iban: string
  documentNumber: string
  documentType: string
  issuedDate: string
  expirationDate: string
  documentFront: File
  documentBack: File
  taxCodeFront: File
  taxCodeBack: File
  email: string
  password: string
  confirmPassword: string
}

export interface ResisterResponse {
  id: string
  name: string
  surname: string
  email: string
  message: string
  time: string
}

// ==========================
// LOGIN
// ==========================

export interface LoginPayload {
  email: string
  password?: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

// ==========================
// MODIFICHE EMAIL E PASSWORD
// ==========================

export interface UpdateCredentialsPayload {
  email?: string
  oldPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}

export interface UpdateCredentialsResponse {
  message: string
  time: string
}
