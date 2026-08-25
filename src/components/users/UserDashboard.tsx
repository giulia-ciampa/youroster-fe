import {
  Col,
  Container,
  Row,
  Form,
  Table,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap"
import { PiUserLight } from "react-icons/pi"
import { UserNavbar } from "./UserNavbar"
import { useEffect, useState } from "react"
import type { Clocking, ShiftAssignment } from "../../types/shift"
import {
  getColleaguesWithMyShift,
  getMyAssignmentsByDate,
} from "../../services/shiftAssignmentService"
import { getMyProfile, updateMyAvatar } from "../../services/userService" // <-- La funzione per i dati utente
import type { UserProfileResponse } from "../../types/users"
import { MdAddAPhoto } from "react-icons/md"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userSlice"
import {
  getMyClockingForDate,
  handleClockIn,
} from "../../services/clockingsService"

export const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
    null,
  )
  const [todayAssignment, setTodayAssignment] =
    useState<ShiftAssignment | null>(null)
  const [coworkers, setCoworkers] = useState<ShiftAssignment[]>([])
  const [loadingProfile, setLoadingProfile] = useState(true)

  const todayString = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState<string>(todayString)

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const [clocking, setClocking] = useState<Clocking | null>(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  // 1. Chiamata per i dati del profilo utente (al caricamento della pagina)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile()
        setUserProfile(data)
        dispatch(
          setUser({
            photoUrl: data.photoUrl,
            name: data.name,
            surname: data.surname,
            roleNames: data.roleNames,
          }),
        )
      } catch (error) {
        console.error("Errore nel caricamento del profilo utente", error)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [])

  // 2. Chiamata unica per i turni che si aggiorna ogni volta che cambia 'selectedDate'
  useEffect(() => {
    const fetchAssignmentsForDate = async () => {
      try {
        const assignments = await getMyAssignmentsByDate(selectedDate)

        if (assignments.length > 0) {
          setTodayAssignment(assignments[0])
        } else {
          setTodayAssignment(null)
          setCoworkers([])
        }

        const colleaguesData = await getColleaguesWithMyShift(selectedDate)
        setCoworkers(colleaguesData)
      } catch (error) {
        console.error(
          "Errore nel recupero dei turni per la data selezionata",
          error,
        )
      }
    }

    fetchAssignmentsForDate()
  }, [selectedDate])
  console.log(userProfile)

  //TIMBRATURA ENTRATA PER DATA
  useEffect(() => {
    const fetchClocking = async () => {
      try {
        const data = await getMyClockingForDate(selectedDate)

        console.log("TIMBRATURA:", data)

        setClocking(data)
      } catch (error) {
        console.error("Errore nel recupero della timbratura:", error)
        setClocking(null)
      }
    }

    fetchClocking()
  }, [selectedDate])

  //
  const handleClockInClick = async () => {
    setLoading(true)

    try {
      const success = await handleClockIn()

      if (success) {
        const data = await getMyClockingForDate(selectedDate)
        setClocking(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Upload foto
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      setAvatarPreview(URL.createObjectURL(file))

      try {
        // Chiamata al service che comunica col backend (Cloudinary + salvataggio DB)
        const updatedProfile = await updateMyAvatar(file)
        setUserProfile(updatedProfile)

        if (updatedProfile.photoUrl) {
          localStorage.setItem("photoUrl", updatedProfile.photoUrl)
        }

        // Mostra l'alert di successo
        setAlertMessage("Foto profilo aggiornata con successo!")
        setShowAlert(true)

        // Nascondi l'alert dopo 3 secondi
        setTimeout(() => setShowAlert(false), 3000)
      } catch (error) {
        console.error(
          "Errore durante l'aggiornamento della foto profilo",
          error,
        )
        setAlertMessage("Errore durante il caricamento della foto.")
        setShowAlert(true)
      }
    }
  }

  return (
    <>
      <UserNavbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center flex-grow-1"
      >
        <Row className="g-4 w-100 justify-content-center">
          {/* COLONNA SINISTRA: Foto profilo, nome, cognome, email */}
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column align-items-center p-4 border rounded"
          >
            {showAlert && (
              <Alert
                variant={
                  alertMessage.includes("Errore") ? "warning" : "primary"
                }
                className="w-100 py-2 text-center small"
              >
                {alertMessage}
              </Alert>
            )}

            {loadingProfile ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                {/* Contenitore tondo della foto con effetto hover/click */}
                <div
                  className="position-relative d-inline-block mb-3"
                  style={{ width: "110px", height: "110px", cursor: "pointer" }}
                  onClick={() =>
                    document.getElementById("avatarInput")?.click()
                  }
                >
                  <div className="w-100 h-100 rounded-circle overflow-hidden bg-light border border-2 border-secondary d-flex align-items-center justify-content-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    ) : userProfile?.photoUrl ? (
                      <img
                        src={userProfile.photoUrl}
                        alt="User Profile"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <PiUserLight size={80} className="text-secondary" />
                    )}
                  </div>

                  {/* Icona della fotocamera in basso a destra */}
                  <div
                    className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm border border-primary d-flex align-items-center justify-content-center"
                    style={{ width: "30px", height: "30px" }}
                  >
                    <MdAddAPhoto size={16} className="text-primary" />
                  </div>
                </div>

                {/* Input file nascosto */}
                <input
                  id="avatarInput"
                  type="file"
                  className="d-none"
                  onChange={handleAvatarUpload}
                />

                <h4 className="fw-bold mb-1">
                  {userProfile?.name} {userProfile?.surname}
                </h4>
                <p className="text-muted small">{userProfile?.roleNames}</p>
              </>
            )}
            <div className="w-100 mt-4 text-center">
              <h5 className="fw-semibold mb-3">Gestione Presenze</h5>
              <div className="d-flex flex-column align-items-center gap-2">
                <Button
                  className="w-75 p-3 btn-custom1"
                  onClick={handleClockInClick}
                  disabled={loading || clocking !== null}
                >
                  {loading
                    ? "Timbratura in corso..."
                    : clocking
                      ? "Entrata Timbrata"
                      : "Timbra Entrata"}
                </Button>
                <Button className="w-75 p-3 btn-custom1">Timbra Uscita</Button>
                {clocking && (
                  <p className="text-muted mt-2">
                    Entrata: {clocking.actualStartTime}
                  </p>
                )}
              </div>
            </div>

            {/* Resto del form data... */}
          </Col>

          {/* COLONNA DESTRA: Turno del giorno + Tabella colleghi */}
          <Col xs={12} md={8}>
            {/* Box del turno del giorno */}
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title className=" text-primary">
                  Turno del giorno
                </Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="FormDate">
                    <Form.Control
                      className="w-25 mt-3 input"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {todayAssignment ? (
              <Card className="shadow-sm my-3">
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th className="text-center text-smaller text-dark">
                          Ufficio/Sede
                        </th>
                        <th className="text-center text-smaller text-dark">
                          Turno
                        </th>

                        <th className="text-center text-smaller text-dark">
                          Mansioni
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center text-smaller text-dark">
                          {" "}
                          {todayAssignment.officeName || "Nessuna sede"}
                        </td>
                        <td className="text-center text-smaller text-dark">
                          {" "}
                          {todayAssignment.startTime || "Inizio turno"} -{" "}
                          {todayAssignment.endTime || "Fine turno"}
                        </td>
                        <td className="text-center text-smaller text-dark">
                          {todayAssignment.tasks ||
                            "Non ci sono mansioni assegnate"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-sm my-3">
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th className="text-center text-smaller text-dark">
                          Ufficio/Sede
                        </th>
                        <th className="text-center text-smaller text-dark">
                          Turno
                        </th>

                        <th className="text-center text-smaller text-dark">
                          Mansioni
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center text-smaller text-dark">
                          Nessun ufficio assegnato
                        </td>
                        <td className="text-center text-smaller text-dark">
                          00:00 - 00:00
                        </td>
                        <td className="text-center text-smaller text-dark">
                          Non ci sono mansioni assegnate
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}

            {/* Tabella chi è in turno con te */}
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary mb-3">
                  Colleghi in turno con te
                </Card.Title>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center text-smaller text-dark">
                        Nome
                      </th>
                      <th className="text-center text-smaller text-dark">
                        Cognome
                      </th>
                      <th className="text-center text-smaller text-dark">
                        Ruolo
                      </th>
                      <th className="text-center text-smaller text-dark">
                        Mansioni
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coworkers.length > 0 ? (
                      coworkers.map((colleague, index) => (
                        <tr key={index}>
                          <td className="text-center text-smaller text-dark">
                            {colleague.userName}
                          </td>
                          <td className="text-center text-smaller text-dark">
                            {colleague.userSurname}
                          </td>
                          <td className="text-center text-smaller text-dark">
                            {colleague.roleNames}
                          </td>
                          <td className="text-center text-smaller text-dark">
                            {colleague.tasks}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">
                          Nessun collega in turno o nessun turno attivo.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
