import type { LoginPayload, LoginResponse } from "../types/auth"

const API_URL = import.meta.env.VITE_API_URL

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
