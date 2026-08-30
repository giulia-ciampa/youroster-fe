import type {
  AbsenceCertificationRequestDTO,
  AbsenceCertificationResponse,
  HolidayRequestDTO,
  HolidayRequestResponse,
  LeaveHoursRequestDTO,
  LeaveHoursRequestResponse,
  RequestResponse,
  UpdateCertificationRequestDTO,
  UpdateHolidayRequestDTO,
  UpdateLeaveHoursRequestDTO,
} from "../types/requests"
import type { PageResponse, UserSummaryResponse } from "../types/users"
import { authFetch } from "./apiClient"

//NUOVA RICHIESTA FERIE
export const createHolidayRequest = async (payload: HolidayRequestDTO) => {
  const response = await authFetch("/holidays", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message || "Errore nella creazione della richiesta ferie.",
    )
  }

  return response.json()
}

//NUOVA RICHIESTA DI PERMESSO
export const createLeaveHoursRequest = async (
  payload: LeaveHoursRequestDTO,
) => {
  const response = await authFetch("/leave-hours", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message ||
        "Errore nella creazione della richiesta di permesso.",
    )
  }

  return response.json()
}

//NUOVA RICHIESTA CON CERTIFICATO
export const createAbsenceCertificationRequest = async (
  payload: AbsenceCertificationRequestDTO,
) => {
  const formData = new FormData()

  formData.append("protocolCode", payload.protocolCode)
  formData.append("startDate", payload.startDate)
  formData.append("endDate", payload.endDate)
  formData.append("issueDate", payload.issueDate)
  formData.append("certificateFile", payload.certificateFile)
  formData.append("certificateType", payload.certificateType)

  if (payload.employeeNotes) {
    formData.append("employeeNotes", payload.employeeNotes)
  }

  const response = await authFetch("/certifications", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message ||
        "Errore nella creazione della richiesta di malattia.",
    )
  }

  return response.json()
}

//GET MIE RICHIESTE -----------------------------------------------------------------

//GET FERIE
export const getMyHolidayRequests = async (
  page = 0,
  size = 15,
): Promise<PageResponse<HolidayRequestResponse>> => {
  const response = await authFetch(
    `/holidays/me?page=${page}&size=${size}&sortBy=createdAt`,
  )

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nel recupero delle richieste ferie.",
    )
  }

  return response.json()
}

//GET PERMESSI
export const getMyLeaveHoursRequests = async (
  page = 0,
  size = 15,
): Promise<PageResponse<LeaveHoursRequestResponse>> => {
  const response = await authFetch(
    `/leave-hours/me?page=${page}&size=${size}&sortBy=createdAt`,
  )

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nel recupero delle richieste di permesso.",
    )
  }

  return response.json()
}

//GET RICHIESTE CON CERTIFICATO
export const getMyAbsenceCertifications = async (
  page = 0,
  size = 15,
): Promise<PageResponse<AbsenceCertificationResponse>> => {
  const response = await authFetch(
    `/certifications/myRequests?page=${page}&size=${size}&sortBy=createdAt`,
  )

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nel recupero delle richieste di malattia.",
    )
  }

  return response.json()
}

//GET RIEPILOGO
export const getUserLeaveSummary = async (): Promise<UserSummaryResponse> => {
  const response = await authFetch("/leaves/summary")

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message ||
        "Errore nel recupero del riepilogo ferie e permessi.",
    )
  }

  return response.json()
}

//-----MODIFICA MIE RICHIESTE

//MODIFICA MIE FERIE

export const updateHolidayRequest = async (
  requestId: string,
  payload: UpdateHolidayRequestDTO,
) => {
  const response = await authFetch(`/holidays/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nella modifica della richiesta ferie.",
    )
  }

  return response.json()
}

//MODIFICA MIE ORE DI PERMESSO
export const updateLeaveHoursRequest = async (
  requestId: string,
  payload: UpdateLeaveHoursRequestDTO,
) => {
  const response = await authFetch(`/leave-hours/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nella modifica della richiesta di permesso.",
    )
  }

  return response.json()
}

//MODIFICA MIE ASSENZE CERTIFICATE
export const updateAbsenceCertificationRequest = async (
  requestId: string,
  payload: UpdateCertificationRequestDTO,
) => {
  const formData = new FormData()

  if (payload.protocolCode) {
    formData.append("protocolCode", payload.protocolCode)
  }

  if (payload.startDate) {
    formData.append("startDate", payload.startDate)
  }

  if (payload.endDate) {
    formData.append("endDate", payload.endDate)
  }

  if (payload.issueDate) {
    formData.append("issueDate", payload.issueDate)
  }

  if (payload.certificateFile) {
    formData.append("certificateFile", payload.certificateFile)
  }

  if (payload.certificateType) {
    formData.append("certificateType", payload.certificateType)
  }

  if (payload.employeeNotes) {
    formData.append("employeeNotes", payload.employeeNotes)
  }

  const response = await authFetch(`/certifications/${requestId}`, {
    method: "PATCH",
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nella modifica della richiesta certificata.",
    )
  }

  return response.json()
}

//----ELIMINA(PROPRIE)

//ELIMINA MIE FERIE
export const deleteHolidayRequest = async (requestId: string) => {
  const response = await authFetch(`/holidays/${requestId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message || "Errore nell'eliminazione della richiesta ferie.",
    )
  }
}

//ELIMINA MIE ORE PERMESSO
export const deleteLeaveHoursRequest = async (requestId: string) => {
  const response = await authFetch(`/leave-hours/${requestId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message ||
        "Errore nell'eliminazione della richiesta di permesso.",
    )
  }
}

//ELIMINA MIE RICHIESTE CERTIFICATE
export const deleteAbsenceCertificationRequest = async (requestId: string) => {
  const response = await authFetch(`/certifications/${requestId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.message ||
        "Errore nell'eliminazione della richiesta certificata.",
    )
  }
}

//GET PER SHIFT MANAGER E ADMIN ----------------------------------------------------------------

// GET RICHIESTE FERIE DA APPROVARE - SHIFT MANAGER
export const getPendingHolidayRequests = async (): Promise<
  PageResponse<HolidayRequestResponse>
> => {
  const response = await authFetch("/holidays/pending", {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error("Errore nel recupero delle richieste ferie")
  }

  const pageData: PageResponse<HolidayRequestResponse> = await response.json()

  return pageData
}

// GET RICHIESTE PERMESSO DA APPROVARE - SHIFT MANAGER
export const getPendingLeaveHoursRequests = async (): Promise<
  PageResponse<LeaveHoursRequestResponse>
> => {
  const response = await authFetch("/leave-hours/pending", {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error("Errore nel recupero delle richieste di permesso.")
  }

  const pageData: PageResponse<LeaveHoursRequestResponse> =
    await response.json()

  return pageData
}

//-------------------------------APPROVA RICHIESTE
// APPROVA RICHIESTA FERIE - SHIFT MANAGER / ADMIN

export const approveHolidayRequest = async (
  requestId: string,
  notes?: string,
): Promise<HolidayRequestResponse> => {
  const response = await authFetch(`/holidays/${requestId}/approve`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: notes ? JSON.stringify({ notes }) : undefined,
  })

  if (!response.ok) {
    throw new Error("Errore nell'approvazione della richiesta ferie")
  }

  return await response.json()
}

// APPROVA RICHIESTA PERMESSO - SHIFT MANAGER / ADMIN

export const approveLeaveHoursRequest = async (
  requestId: string,
  notes?: string,
): Promise<LeaveHoursRequestResponse> => {
  const response = await authFetch(`/leave-hours/${requestId}/approve`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: notes ? JSON.stringify({ notes }) : undefined,
  })

  if (!response.ok) {
    throw new Error("Errore nell'approvazione della richiesta di permesso")
  }

  return await response.json()
}

//_-------------------------------RIFIUTA RICHIESTE
//RIFIUTA RICHIESTA FERIE
export const rejectHolidayRequest = async (
  requestId: string,
  notes?: string,
): Promise<HolidayRequestResponse> => {
  const response = await authFetch(`/holidays/${requestId}/reject`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: notes ? JSON.stringify({ notes }) : undefined,
  })

  if (!response.ok) {
    throw new Error("Errore nel rifiuto della richiesta ferie")
  }

  return await response.json()
}

//RIFIUTA RICHIESTA DI PERMESSO
export const rejectLeaveHoursRequest = async (
  requestId: string,
  notes?: string,
): Promise<LeaveHoursRequestResponse> => {
  const response = await authFetch(`/leave-hours/${requestId}/reject`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: notes ? JSON.stringify({ notes }) : undefined,
  })

  if (!response.ok) {
    throw new Error("Errore nel rifiuto della richiesta di permesso")
  }

  return await response.json()
}

//GET TUTTE LE RICHIESTE -----------------------------HR E ADMIN---------------
export const getRequests = async (
  page = 0,
  size = 15,
): Promise<PageResponse<RequestResponse>> => {
  const response = await authFetch(
    `/requests?page=${page}&size=${size}&sortBy=createdAt`,
  )

  return response.json()
}
