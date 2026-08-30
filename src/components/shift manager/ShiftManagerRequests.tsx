import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
  Table,
  Form,
} from "react-bootstrap"
import { ShiftManagerNavbar } from "./ShiftManagerNavbar"
import { useEffect, useState } from "react"
import type { RequestType, UserRequest } from "../users/UserRequests"
import {
  approveHolidayRequest,
  approveLeaveHoursRequest,
  getPendingHolidayRequests,
  getPendingLeaveHoursRequests,
  getRequests,
  rejectHolidayRequest,
  rejectLeaveHoursRequest,
} from "../../services/requestService"
import type { RequestResponse } from "../../types/requests"

import "../../styles/mobileText.css"

export const ShiftManagerRequests = () => {
  console.log("SHIFT MANAGER REQUESTS COMPONENT")
  const [requests, setRequests] = useState<UserRequest[]>([])
  const [allRequests, setAllRequests] = useState<RequestResponse[]>([])
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<UserRequest | null>(
    null,
  )

  const [reviewerNotes, setReviewerNotes] = useState("")

  const fetchRequests = async () => {
    try {
      setLoading(true)

      const ferie = await getPendingHolidayRequests()
      const permessi = await getPendingLeaveHoursRequests()

      console.log("FERIE COMPLETE:", ferie)
      console.log("FERIE CONTENT:", ferie.content)

      console.log("PERMESSI COMPLETI:", permessi)
      console.log("PERMESSI CONTENT:", permessi.content)

      const allRequests: UserRequest[] = [
        ...ferie.content.map((req) => ({
          ...req,
          requestType: "HOLIDAY" as const,
        })),

        ...permessi.content.map((req) => ({
          ...req,
          requestType: "LEAVE_HOURS" as const,
        })),
      ]

      console.log("ALL REQUESTS:", allRequests)

      setRequests(allRequests)
    } catch (error) {
      console.error("Errore nel recupero delle richieste:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRequests()
  }, [])

  //traduzione stato richiesta
  const getRequestStatusLabel = (status: string) => {
    switch (status) {
      case "SENT":
        return {
          label: "INVIATA",
          className: "text-warning bg-transparent",
        }

      case "APPROVED":
        return {
          label: "APPROVATA",
          className: "text-success",
        }

      case "REJECTED":
        return {
          label: "RIFIUTATA",
          className: "text-danger",
        }

      default:
        return {
          label: status,
          className: "",
        }
    }
  }

  //traduzione tipo di richiesta
  const getRequestTypeLabel = (requestType: RequestType) => {
    switch (requestType) {
      case "HOLIDAY":
        return "FERIE"

      case "LEAVE_HOURS":
        return "ORE DI PERMESSO"

      default:
        return requestType
    }
  }

  //funzione approva richiesta
  const handleApprove = async () => {
    if (!selectedRequest) return

    try {
      setLoading(true)

      if (selectedRequest.requestType === "HOLIDAY") {
        await approveHolidayRequest(
          selectedRequest.id,
          reviewerNotes || undefined,
        )
      }

      if (selectedRequest.requestType === "LEAVE_HOURS") {
        await approveLeaveHoursRequest(
          selectedRequest.id,
          reviewerNotes || undefined,
        )
      }

      alert("Richiesta approvata con successo!")

      setShowModal(false)
      setSelectedRequest(null)
      setReviewerNotes("")

      // qui poi aggiorniamo la tabella
      await fetchRequests()
    } catch (error) {
      console.error("Errore nell'approvazione:", error)
      alert("Si è verificato un errore durante l'approvazione della richiesta.")
    } finally {
      setLoading(false)
    }
  }

  //funzione rifiuta richiesta
  const handleReject = async () => {
    if (!selectedRequest) return

    try {
      setLoading(true)

      if (selectedRequest.requestType === "HOLIDAY") {
        await rejectHolidayRequest(
          selectedRequest.id,
          reviewerNotes || undefined,
        )
      }

      if (selectedRequest.requestType === "LEAVE_HOURS") {
        await rejectLeaveHoursRequest(
          selectedRequest.id,
          reviewerNotes || undefined,
        )
      }

      alert("Richiesta rifiutata con successo!")

      setShowModal(false)
      setSelectedRequest(null)
      setReviewerNotes("")

      await fetchRequests()
    } catch (error) {
      console.error("Errore nel rifiuto della richiesta:", error)
    } finally {
      setLoading(false)
    }
  }

  //tutte le richieste
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await getRequests(0, 15)

        console.log("RICHIESTE COMPLESSIVE:", data)

        setAllRequests(data.content)
      } catch (error) {
        console.error("Errore nel caricamento delle richieste:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRequests()
  }, [])

  //funzione colore tipo
  const getRequestTypeClass = (requestType: string) => {
    switch (requestType) {
      case "HOLIDAY":
        return "ferie"

      case "LEAVE_HOURS":
        return "permesso"

      case "MATERNITY":
        return "richiesta_certificato"

      case "PATERNITY":
        return "richiesta_certificato"

      case "PARENTAL_LEAVE":
        return "richiesta_certificato"

      case "SICKNESS":
        return "richiesta_certificato"

      default:
        return ""
    }
  }

  //funzione per colorare lo stato
  const colorState = (requestStatus: string) => {
    switch (requestStatus) {
      case "APPROVED":
        return "text-success APPROVATA"

      case "REJECTED":
        return "text-danger RIFIUTATA"

      case "CANCELLED":
        return "text-danger CANCELLATA"

      case "SENT":
        return "text-warning INVIATA"
    }
  }

  // funzione per tradurre lo stato della richiesta
  const translateRequestStatus = (requestStatus: string) => {
    switch (requestStatus) {
      case "APPROVED":
        return "APPROVATA"

      case "REJECTED":
        return "RIFIUTATA"

      case "CANCELLED":
        return "CANCELLATA"

      case "SENT":
        return "INVIATA"

      default:
        return requestStatus
    }
  }

  //funzione per tradurre il tipo di richiesta
  const translateRequestType = (requestType: string) => {
    switch (requestType) {
      case "HOLIDAY":
        return "FERIE"

      case "LEAVE_HOURS":
        return "ORE DI PERMESSO"

      case "MATERNITY":
        return "MATERNITÀ"

      case "PATERNITY":
        return "PATERNITÀ"

      case "PARENTAL_LEAVE":
        return "CONGEDO PARENTALE"

      case "SICKNESS":
        return "MALATTIA"

      default:
        return ""
    }
  }

  return (
    <>
      <ShiftManagerNavbar />
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center flex-grow-1 my-4"
      >
        {/* TITOLO */}
        <Row className="w-100 justify-content-center mb-3">
          <Col xs={12} md={11} className="ps-0">
            <h3 className="small-title text-dark mb-0">Gestione richieste</h3>
          </Col>
        </Row>

        {/*RICHIESTE DA APPROVARE */}
        <Row className="w-100 justify-content-center mb-3 my-3">
          <Col xs={12} md={11} className="ps-0">
            <Card className="bg-light border border-secondary rounded shadow-sm">
              <Card.Body className="p-4">
                <h4 className="text-primary fw-semibold mb-4 small-title">
                  Richieste da lavorare
                </h4>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <Table
                    bordered
                    hover
                    responsive
                    className="text-center align-middle"
                  >
                    <thead>
                      <tr>
                        <th className="small-text text-dark text-center text-nowrap">
                          Giorno e ora
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Nome
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Tipo
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Periodo
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Quantità
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Note dipendente
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Note revisore
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Stato richiesta
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Lavora richiesta
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {requests.length > 0 ? (
                        requests.map((req) => (
                          <tr key={req.id}>
                            <td className="small-text text-dark">
                              {req.createdAt}
                            </td>

                            <td>{req.employeeName}</td>

                            <td
                              className={
                                req.requestType === "HOLIDAY"
                                  ? "ferie"
                                  : "permesso"
                              }
                            >
                              {getRequestTypeLabel(req.requestType)}
                            </td>

                            <td className="small-text text-dark">
                              {req.requestType === "HOLIDAY"
                                ? `${req.startDate}-${req.endDate}`
                                : `${req.date} ${req.startTime} - ${req.endTime}`}
                            </td>

                            <td className="small-text text-dark">
                              {req.requestType === "HOLIDAY"
                                ? `${req.totalDays} giorni`
                                : `${req.totalHours} ore`}
                            </td>

                            <td className="small-text text-dark">
                              {req.employeeNotes || "-"}
                            </td>

                            <td>{req.reviewerNotes || "-"}</td>

                            <td className="small-text text-dark">
                              {" "}
                              {(() => {
                                const status = getRequestStatusLabel(
                                  req.requestStatus,
                                )

                                return (
                                  <span className={status.className}>
                                    {status.label}
                                  </span>
                                )
                              })()}
                            </td>

                            <td className="small-text">
                              <Button
                                className="btn-custom1 p-1 text-nowrap"
                                onClick={() => {
                                  setShowModal(true)
                                  setSelectedRequest(req)
                                }}
                              >
                                Lavora richiesta
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center text-muted">
                            Nessuna richiesta da lavorare trovata.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/*TUTTE LE RICHIESTE */}
        <Row className="w-100 justify-content-center mb-3 my-3">
          <Col Col xs={12} md={11} className="ps-0">
            <Card className="bg-light border border-secondary rounded shadow-sm">
              <Card.Body className="p-4">
                <h4 className="text-primary fw-semibold mb-4 small-title">
                  Tutte le richieste
                </h4>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <Table
                    bordered
                    hover
                    responsive
                    className="text-center align-middle"
                  >
                    <thead>
                      <tr>
                        <th className="small-text text-dark text-center text-nowrap">
                          Giorno e ora
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Nome
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Tipo
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Periodo
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Quantità
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Note dipendente
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Note revisore
                        </th>
                        <th className="small-text text-dark text-center text-nowrap">
                          Stato richiesta
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {allRequests.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center text-muted">
                            Nessuna richiesta trovata.
                          </td>
                        </tr>
                      ) : (
                        allRequests.map((request) => (
                          <tr key={request.id}>
                            {/* Giorno e ora */}
                            <td className="small-text">
                              {new Date(request.createdAt).toLocaleDateString(
                                "it-IT",
                              )}
                              <br />
                              {new Date(request.createdAt).toLocaleTimeString(
                                "it-IT",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </td>

                            {/* Nome */}
                            <td className="small-text">
                              {request.employeeName}
                            </td>

                            {/* Tipo */}
                            <td
                              className={`small-text ${getRequestTypeClass(request.requestType)}`}
                            >
                              {translateRequestType(request.requestType)}
                            </td>

                            {/* Periodo */}
                            <td className="small-text">
                              {request.startDate && request.endDate ? (
                                <>
                                  {new Date(
                                    request.startDate,
                                  ).toLocaleDateString("it-IT")}
                                  {" - "}
                                  {new Date(request.endDate).toLocaleDateString(
                                    "it-IT",
                                  )}
                                </>
                              ) : request.date ? (
                                <>
                                  {new Date(request.date).toLocaleDateString(
                                    "it-IT",
                                  )}
                                  <br />
                                  {request.startTime} - {request.endTime}
                                </>
                              ) : (
                                "-"
                              )}
                            </td>

                            {/* Quantità */}
                            <td className="small-text">
                              {request.totalDays
                                ? `${request.totalDays} giorni`
                                : request.totalHours
                                  ? `${request.totalHours} ore`
                                  : "-"}
                            </td>

                            {/* Note dipendente */}
                            <td className="small-text">
                              {request.employeeNotes || "-"}
                            </td>

                            {/* Note revisore */}
                            <td className="small-text">
                              {request.reviewerNotes || "-"}
                            </td>

                            {/* Stato */}
                            <td
                              className={`small-text ${colorState(request.requestStatus)}`}
                            >
                              {translateRequestStatus(request.requestStatus)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/*MODALE */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            {selectedRequest?.requestType === "HOLIDAY" ? (
              <Modal.Title className="small-title text-dark">
                Lavora richiesta ferie{" "}
              </Modal.Title>
            ) : (
              <Modal.Title className="small-title text-dark">
                Lavora richiesta ore di permesso{" "}
              </Modal.Title>
            )}
          </Modal.Header>

          <Modal.Body>
            {selectedRequest?.requestType === "HOLIDAY" && (
              <div className="px-2">
                <ul>
                  <li className="text-dark small-text">
                    {" "}
                    <span className="fw-bold me-1">
                      Data e ora invio richiesta:
                    </span>{" "}
                    {selectedRequest.createdAt}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Richiesta inviata da:</span>
                    {selectedRequest.employeeName}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Giorni richiesti:</span>
                    {selectedRequest.startDate}-{selectedRequest.endDate}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Totale giorni:</span>
                    {selectedRequest.totalDays}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Note dipendente:</span>
                    {selectedRequest.employeeNotes}
                  </li>
                </ul>
                <div>
                  <Form>
                    <Form.Group className="mb-3" controlId="FormReviewerNotes">
                      <Form.Label className="small-text text-muted mb-0">
                        Nota
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Inserisci nota (facoltativo)"
                        value={reviewerNotes}
                        onChange={(e) => setReviewerNotes(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            )}

            {selectedRequest?.requestType === "LEAVE_HOURS" && (
              <div className="px-2">
                <ul>
                  <li className="text-dark small-text">
                    {" "}
                    <span className="fw-bold me-1">
                      Data e ora invio richiesta:
                    </span>{" "}
                    {selectedRequest.createdAt}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Richiesta inviata da:</span>
                    {selectedRequest.employeeName}
                  </li>
                  <li>
                    <span className="fw-bold me-1">In data:</span>
                    {selectedRequest.date}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Per la fascia oraria:</span>
                    {selectedRequest.startTime}-{selectedRequest.endTime}
                  </li>
                  <li>
                    {" "}
                    <span className="fw-bold me-1">Per ore totali:</span>
                    {selectedRequest.totalHours}
                  </li>
                  <li>
                    <span className="fw-bold me-1">Note dipendente:</span>
                    {selectedRequest.employeeNotes}
                  </li>
                </ul>
                <div>
                  <Form>
                    <Form.Group className="mb-3" controlId="FormReviewerNotes">
                      <Form.Label className="small-text text-muted mb-0">
                        Nota
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Inserisci nota (facoltativo)"
                        value={reviewerNotes}
                        onChange={(e) => setReviewerNotes(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-custom1" onClick={handleApprove}>
              Approva{" "}
            </Button>
            <Button className="btn-custom2" onClick={handleReject}>
              Rifiuta{" "}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
