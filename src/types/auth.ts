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
