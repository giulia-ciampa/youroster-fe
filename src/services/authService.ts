import type {
  LoginPayload,
  LoginResponse,
  ApiErrorResponse,
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

  return data // "Se l'email esiste, le istruzioni sono state inviate."
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

  const data = await response.text()

  if (!response.ok) {
    throw new Error(data || "Token non valido o scaduto.")
  }

  return data // "Password modificata con successo!"
}
