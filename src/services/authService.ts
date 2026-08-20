import type {
  LoginPayload,
  LoginResponse,
  ApiErrorResponse,
  RegisterPayload,
} from "../types/auth"

const API_URL = import.meta.env.VITE_API_URL
//============================
//LOGIN
//===============================
export const loginCall = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
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
        errorData.error ||
        "Credenziali non valide o errore durante il login",
    )
  }

  const data: LoginResponse = await response.json()

  // Salvataggio nel localStorage
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  localStorage.setItem("photoUrl", data.photoUrl)

  return data
}

//==================================
// Richiesta invio email per password dimenticata
//==================================
export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })

  const data = (await response.json()) as ApiErrorResponse

  if (!response.ok) {
    const errorMessage =
      data.errorsList?.[0] || data.message || "Errore durante la richiesta"
    throw new Error(errorMessage)
  }

  return data.message // "Se l'email esiste, le istruzioni sono state inviate."
}

//==================================
// Modifica effettiva della password con il token
//==================================
export async function resetPassword(token: string, newPassword: string) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(JSON.stringify(data) || "Token non valido o scaduto.")
  }

  return data.message
}

//==================================
// REGISTRAZIONE
//==================================
export async function registration(payload: RegisterPayload) {
  const formData = new FormData()

  formData.append("name", payload.name)
  formData.append("surname", payload.surname)
  formData.append("taxCode", payload.taxCode)
  formData.append("dateOfBirth", payload.dateOfBirth)
  formData.append("placeOfBirth", payload.placeOfBirth)
  formData.append("nationality", payload.nationality)
  formData.append("phoneNumber", payload.phoneNumber)
  formData.append("streetAddress", payload.streetAddress)
  formData.append("houseNumber", payload.houseNumber)
  formData.append("zipCode", payload.zipCode)
  formData.append("city", payload.city)
  formData.append("province", payload.province)

  formData.append("iban", payload.iban)
  formData.append("documentNumber", payload.documentNumber)
  formData.append("documentType", payload.documentType)
  formData.append("issueDate", payload.issueDate)
  formData.append("expirationDate", payload.expirationDate)

  // I file vanno aggiunti solo se presenti
  if (payload.documentFront)
    formData.append("documentFront", payload.documentFront)
  if (payload.documentBack)
    formData.append("documentBack", payload.documentBack)
  if (payload.taxCodeFront)
    formData.append("taxCodeFront", payload.taxCodeFront)
  if (payload.taxCodeBack) formData.append("taxCodeBack", payload.taxCodeBack)

  formData.append("email", payload.email)
  formData.append("password", payload.password)
  formData.append("confirmPassword", payload.confirmPassword)

  const response = await fetch(`${API_URL}/auth/registration`, {
    method: "POST",
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(JSON.stringify(data))
  }

  return data
}
