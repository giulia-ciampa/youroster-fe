import type {
  LoginPayload,
  LoginResponse,
  ApiErrorResponse,
  RegisterPayload,
} from "../types/auth"

const API_URL = import.meta.env.VITE_API_URL

//============================
// LOGIN (Usa fetch normale)
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

  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  localStorage.setItem("photoUrl", data.photoUrl)

  return data
}

//==================================
// Forgot Password (Usa fetch normale)
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

  return data.message
}

//==================================
// Reset Password (Usa fetch normale)
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
// REGISTRAZIONE (Usa fetch normale)
//==================================
export async function registration(payload: RegisterPayload) {
  const formData = new FormData()
  // ... (tutti i tuoi append rimangono identici)

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
