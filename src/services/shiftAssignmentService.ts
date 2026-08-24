import type { ShiftAssignment } from "../types/shift"
import type { PageResponse } from "../types/users"
import { authFetch } from "./apiClient"

export const getMyAssignmentsByDate = async (
  dateString: string,
): Promise<ShiftAssignment[]> => {
  const token = localStorage.getItem("accessToken")

  // startDate ed endDate uguali alla data di oggi per isolare il turno
  const response = await authFetch(
    `/shift-assignment/me?startDate=${dateString}&endDate=${dateString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error("Errore nel recupero delle assegnazioni.")
  }

  const pageData: PageResponse<ShiftAssignment> = await response.json()
  return pageData.content
}
