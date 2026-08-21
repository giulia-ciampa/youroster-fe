import { authFetch } from "./apiClient"

// 1. SHIFT ASSIGNMENT BY DATE
export const fetchAssignmentsByDate = async (
  shiftDate: string,
  officeName?: string,
  assignmentType?: string,
) => {
  const params = new URLSearchParams({ shiftDate })
  if (officeName) params.append("officeName", officeName)
  if (assignmentType) params.append("assignmentType", assignmentType)

  // Passiamo solo il percorso relativo, authFetch aggiungerà API_URL in automatico
  const response = await authFetch(
    `/shift-assignment/by-date?${params.toString()}`,
    {
      method: "GET",
    },
  )

  if (!response.ok) throw new Error("Errore nel recupero dei turni")
  return response.json()
}

// 2. SHIFT TASKS
export const fetchDailyTasks = async (date?: string) => {
  const params = new URLSearchParams()
  if (date) params.append("date", date)

  const response = await authFetch(`/shift-tasks?${params.toString()}`, {
    method: "GET",
  })

  if (!response.ok) throw new Error("Errore nel recupero dei task")
  return response.json()
}

// 3. CLOCKINGS BY USER
export const fetchClockingsByUser = async (userId: string, date?: string) => {
  const params = new URLSearchParams()
  if (date) params.append("date", date)

  const response = await authFetch(
    `/clockings/user/${userId}?${params.toString()}`,
    {
      method: "GET",
    },
  )

  if (!response.ok) throw new Error("Errore nel recupero delle timbrature")
  return response.json()
}

//4. ACCOUNT DA ATTIVARE
export const fetchPendingAccounts = async (page = 0, size = 20) => {
  const response = await authFetch(
    `/accounts/pending?page=${page}&size=${size}`,
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.message || "Errore nel caricamento delle richieste in sospeso",
    )
  }

  return await response.json()
}
