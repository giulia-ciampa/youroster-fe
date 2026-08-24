import type { ShiftAssignment } from "../types/shift"
import type { PageResponse } from "../types/users"
import { authFetch } from "./apiClient"

//GET IL TURNO DEL GIORNO
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

// GET UTENTI IN TURNO CON ME
export const getColleaguesWithMyShift = async (
  dateString: string,
): Promise<ShiftAssignment[]> => {
  // Se authFetch aggiunge già il token in automatico, puoi evitare di riprenderlo,
  // ma se lo richiede esplicitamente lascialo pure così:
  const token = localStorage.getItem("accessToken")

  const response = await authFetch(
    `/shift-assignment/colleagues-onshift?shiftDate=${dateString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error("Errore nel recupero delle assegnazioni dei colleghi.")
  }

  return await response.json()
}
