import type {
  AbsenceCertificationRequestDTO,
  AbsenceCertificationResponse,
  HolidayRequestDTO,
  HolidayRequestResponse,
  LeaveHoursRequestDTO,
  LeaveHoursRequestResponse,
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

//GET -----------------------------------------------------------------

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

//-----MODIFICA

//MODIFICA FERIE

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

//MODIFICA ORE DI PERMESSO
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

//MODIFICA ASSENZE CERTIFICATE
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

//----ELIMINA

//ELIMINA FERIE
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

//ELIMINA ORE PERMESSO
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

//ELIMINA RICHIESTE CERTIFICATE
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
