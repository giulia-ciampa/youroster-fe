import { useEffect, useState } from "react"
import {
  fetchAssignmentsByDate,
  fetchClockingsByUser,
  fetchDailyTasks,
  fetchPendingAccounts,
} from "../services/adminService"
import type { Clocking, ShiftAssignment, ShiftTask, User } from "../types/shift"
import AdminNavbar from "./AdminNavbar"
import { Container, Row, Form, Col, Dropdown } from "react-bootstrap"
import { PiBellRingingLight } from "react-icons/pi"
import "../styles/mobileText.css"

const AdminDashBoard = () => {
  // Stati per i dati
  const [assignments, setAssignments] = useState<ShiftAssignment[]>([])
  const [tasks, setTasks] = useState<ShiftTask[]>([])
  const [clockings, setClockings] = useState<Record<string, Clocking>>({})
  const [pendingAccounts, setPendingAccounts] = useState<User[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)

  // Funzione per caricare gli account in sospeso
  useEffect(() => {
    const loadPendingAccounts = async () => {
      try {
        setLoadingAccounts(true)
        const data = await fetchPendingAccounts()
        // Se Spring Boot restituisce una paginazione, i dati sono dentro data.content.
        // Se restituisce direttamente un array, usa solo `data`.
        setPendingAccounts(data.content || data)
      } catch (error) {
        console.error("Errore nel caricamento degli account in sospeso:", error)
      } finally {
        setLoadingAccounts(false)
      }
    }
    loadPendingAccounts()
  }, [])

  useEffect(() => {
    const loadDashboardData = async (date: string) => {
      try {
        setLoading(true)
        setError("")

        const assignmentsData = await fetchAssignmentsByDate(date)
        setAssignments(assignmentsData.content || assignmentsData)

        const tasksData = await fetchDailyTasks(date)
        setTasks(tasksData.content || tasksData)

        const assignmentList = assignmentsData.content || assignmentsData
        const clockingMap: Record<string, Clocking> = {}

        for (const assignment of assignmentList) {
          const userId = assignment.user?.id
          if (userId) {
            try {
              const clockingData = await fetchClockingsByUser(userId, date)
              const userClockings = clockingData.content || clockingData
              if (userClockings.length > 0) {
                clockingMap[userId] = userClockings[0]
              }
            } catch (err) {
              console.error(`Errore timbrature per utente ${userId}:`, err)
            }
          }
        }
        setClockings(clockingMap)
      } catch (err) {
        console.error("Errore nel caricamento della dashboard:", err)
        setError("Impossibile caricare i dati della dashboard.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData(selectedDate)
  }, [selectedDate])

  if (loading)
    return (
      <div className="text-center p-5 text-primary background2">
        Caricamento in corso...{" "}
      </div>
    )
  if (error)
    return (
      <div className="text-warning border border-warning border-1 p-4 rounded-2  m-5">
        {error}
      </div>
    )

  return (
    <>
      {/* Inseriamo la Navbar qui in cima */}
      <AdminNavbar />
      <Container fluid className="px-3">
        <Row className="d-flex justify-content-center my-4">
          <Col xs={12} lg={10}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-dark small-title">
                Dashboard - Panoramica Giornaliera
              </h2>
              {/* Selettore della data */}
              <div className="d-flex align-items-center">
                <Form>
                  <Form.Group className="mb-3 w-75" controlId="formDate">
                    <Form.Control
                      type="date"
                      className="form-control w-auto border border-1 border-secondary"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Dropdown align="end" className="myDropDown">
                  <Dropdown.Toggle
                    as="div"
                    className="cursor-pointer position-relative d-inline-block p-2"
                  >
                    <p>
                      {" "}
                      <PiBellRingingLight
                        size={26}
                        className="text-secondary small-text"
                      />
                    </p>

                    {/* Mostra il badge rosso solo se ci sono richieste in sospeso */}
                    {pendingAccounts.length > 0 && (
                      <span
                        className="position-absolute top-0 start-100  badge rounded-pill bg-danger"
                        style={{ fontSize: "0.5rem", translate: "-90% 12%" }}
                      >
                        {pendingAccounts.length}
                      </span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="shadow-sm border-0 p-2"
                    style={{
                      minWidth: "300px",
                      maxHeight: "350px",
                      overflowY: "auto",
                    }}
                  >
                    <Dropdown.Header className="fw-bold text-dark">
                      Richieste di Registrazione
                    </Dropdown.Header>
                    <Dropdown.Divider />

                    {loadingAccounts ? (
                      <div className="text-center text-muted small py-3">
                        Caricamento...
                      </div>
                    ) : pendingAccounts.length === 0 ? (
                      <div className="text-center text-muted small py-3">
                        Nessuna nuova richiesta
                      </div>
                    ) : (
                      pendingAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="px-2 py-2 d-flex justify-content-between align-items-center border-bottom"
                        >
                          <div>
                            <p className="mb-0 fw-semibold small">
                              {account.name} {account.surname}
                            </p>
                            <p
                              className="mb-0 text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {account.email}
                            </p>
                          </div>
                          <div>
                            {/* Pulsanti per approvare o rifiutare */}
                            <button
                              className="btn btn-sm btn-success me-1 py-0 px-2"
                              title="Approva"
                              // onClick={() => handleApprove(account.id)}
                            >
                              ✓
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger py-0 px-2"
                              title="Rifiuta"
                              // onClick={() => handleReject(account.id)}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {/* Tabella principale */}
            <div className="card shadow-sm border border-1 border-secondary mb-4">
              <div className="p-2">
                <h4 className="text-dark mb-3 small-title">Turnazioni</h4>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-secondary">
                      <tr>
                        <th className="text-dark smaller-text">Dipendente</th>
                        <th className="text-dark smaller-text">
                          Ufficio / Sede
                        </th>
                        <th className="text-dark smaller-text">
                          Turno Previsto
                        </th>
                        <th className="text-dark smaller-text">Ruolo</th>
                        <th className="text-dark smaller-text">
                          Task Assegnato
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.length > 0 ? (
                        assignments.map((assignment) => {
                          // Trova il task corrispondente per questo turno/utente se c'è un collegamento
                          const matchedTask = tasks.find(
                            (t) => t.shiftAssignment?.id === assignment.id,
                          )

                          return (
                            <tr key={assignment.id}>
                              <td>
                                <strong>
                                  {assignment.userName} {assignment.userSurname}
                                </strong>
                              </td>
                              <td>
                                {assignment.officeName ||
                                  "Nessun ufficio assegnato"}
                              </td>
                              <td>
                                {assignment.startTime} - {assignment.endTime}
                              </td>
                              <td>{assignment.roleNames}</td>
                              <td>
                                {matchedTask ? (
                                  <span>
                                    {matchedTask.title ||
                                      matchedTask.description ||
                                      "Task attivo"}
                                  </span>
                                ) : (
                                  <span className="text-muted">
                                    Nessun task
                                  </span>
                                )}
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center py-4 text-muted"
                          >
                            Nessun turno trovato per la data selezionata.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
          {/* Seconda Tabella: Timbrature */}
          <Col xs={12} lg={10}>
            <div className="card shadow-sm border border-1 border-secondary mt-4">
              <div className="p-2">
                <h4 className="text-dark mb-3 small-title">
                  Timbrature Giornaliere
                </h4>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-secondary">
                      <tr>
                        <th className="text-dark smaller-text">Dipendente</th>
                        <th className="text-dark smaller-text">Entrata</th>
                        <th className="text-dark smaller-text">Uscita</th>
                        <th className="text-dark smaller-text">Ore lavorate</th>
                        <th className="text-dark smaller-text">
                          Minuti lavorati
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.length > 0 ? (
                        assignments.map((assignment) => {
                          const userId = assignment.userId
                          // Recuperiamo la timbratura associata a questo utente tramite il suo ID
                          const userClocking = userId
                            ? clockings[userId]
                            : undefined

                          return (
                            <tr key={`clocking-${assignment.id}`}>
                              <td>
                                <strong>
                                  {assignment.userName} {assignment.userSurname}
                                </strong>
                              </td>
                              <td>
                                {userClocking?.actualStartTime ? (
                                  <span className="text-success fw-bold">
                                    {userClocking.actualStartTime}
                                  </span>
                                ) : (
                                  <span className="text-muted">
                                    Non timbrato
                                  </span>
                                )}
                              </td>
                              <td>
                                {userClocking?.actualEndTime ? (
                                  <span className="text-danger fw-bold">
                                    {userClocking.actualEndTime}
                                  </span>
                                ) : (
                                  <span className="text-muted">
                                    Non timbrato / Non timbrato
                                  </span>
                                )}
                              </td>
                              <td>
                                {userClocking?.workedHours ? (
                                  <span>{userClocking.workedHours} h</span>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              <td>
                                {userClocking?.workedMinutes ? (
                                  <span>{userClocking.workedMinutes} h</span>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center py-4 text-muted"
                          >
                            Nessuna timbratura trovata per la data selezionata.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdminDashBoard
