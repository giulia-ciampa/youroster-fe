// ==========================
// PAGINAZIONE
// ==========================
export interface UserAccount {
  accountId: string
  name: string
  surname: string
  phoneNumber: string
  photoUrl: string
  officeName: string
  email: string
  status: string
  roleNames: string[]
}

export interface PageResponse<T> {
  content: T[]
  pageable?: {
    pageNumber: number
    pageSize: number
  }
  totalElements?: number
  totalPages?: number
  last?: boolean
  size?: number
  number?: number
}

// ==========================
// AGGIORNA IL TUO PROFILO CON LE INFO DI REGISTRAZIONE
// ==========================

export interface UpdateProfilePayload {
  phoneNumber?: string | null
  photoUrl?: File | null
  streetAddress?: string | null
  houseNumber?: string | number | null
  zipCode?: string | null
  iban?: string | null
  documentNumber?: string | null
  documentType?: string | null
  issuedDate?: string | null
  expirationDate?: string | null
  documentFront?: File | null
  documentBack?: File | null
  taxCodeFront?: File | null
  taxCodeBack?: File | null
}

export interface UserProfileResponse {
  accountId: string
  name: string
  surname: string
  email: string
  phoneNumber: string
  photoUrl: string
  streetAddress: string
  houseNumber: string
  zipCode: string
  iban: string
  documentNumber: string
  documentType: string
  issuedDate: string
  expirationDate: string
  documentFrontUrl: string
  documentBackUrl: string
  taxCodeCardFrontUrl: string
  taxCodeCardBackUrl: string
  officeName: string
  roleNames: string[]
}

// ==========================
//ADMIN ACCETTA E ASSEGNA I RUOLI
// ==========================

export interface UpdateUserRolesPayload {
  roles: string[] // Es. ['SHIFT MANAGER'], ['COORDINATOR'], ecc.
}

export interface UpdateUserRolesResponse {
  message: string
  timestamp: string
}

// ==========================
//ADMIN CAMBIA SEDE A COORDINATOR
// ==========================
export interface CoordinatorResponse {
  userId: string
  name: string
  surname: string
  phoneNumber: string
  email: string
  officeName: string
  roleNames: string[]
}
