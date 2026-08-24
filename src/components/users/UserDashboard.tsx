import {
  Col,
  Container,
  Row,
  Form,
  Table,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap"
import { PiUserLight } from "react-icons/pi"
import { UserNavbar } from "./UserNavbar"
import { useEffect, useState } from "react"
import type { ShiftAssignment } from "../../types/shift"
import { getMyAssignmentsByDate } from "../../services/shiftAssignmentService"
import { getMyProfile, updateMyAvatar } from "../../services/userService" // <-- La funzione per i dati utente
import type { UserProfileResponse } from "../../types/users"
import { MdAddAPhoto } from "react-icons/md"

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
  const [avatar, setAvatar] = useState<File | null>(null)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // 1. Chiamata per i dati del profilo utente (al caricamento della pagina)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile()
        setUserProfile(data)
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

  // Upload foto
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatar(file)
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
      <Container className="mt-4">
        <Row className="g-4">
          {/* COLONNA SINISTRA: Foto profilo, nome, cognome, email */}
          <Col
            xs={12}
            md={4}
            lg={4}
            className="background2 d-flex flex-column align-items-center p-4 border rounded"
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
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />

                <h4 className="fw-bold mb-1">
                  {userProfile?.name} {userProfile?.surname}
                </h4>
                <p className="text-muted small">{userProfile?.roleNames}</p>
              </>
            )}

            {/* Resto del form data... */}
          </Col>

          {/* COLONNA DESTRA: Turno del giorno + Tabella colleghi */}
          <Col xs={12} md={8} lg={8}>
            {/* Box del turno del giorno */}
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title className=" text-primary">
                  Turno del giorno
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
                </Card.Title>
                {todayAssignment ? (
                  <div className="mt-3">
                    <p className="mb-1">
                      <strong>Ufficio/Sede:</strong>{" "}
                      {todayAssignment.officeName || "N/D"}
                    </p>
                    <p className="mb-1">
                      <strong>Orario Turno:</strong> {todayAssignment.startTime}{" "}
                      - {todayAssignment.endTime}
                    </p>
                    <p className="mb-0">
                      <strong>Ruolo:</strong>{" "}
                      {todayAssignment.roleNames || "N/D"}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted mt-3 mb-0">
                    Nessun turno assegnato per questa data.
                  </p>
                )}
              </Card.Body>
            </Card>

            {/* Tabella chi è in turno con te */}
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="fw-bold mb-3">
                  Colleghi in turno con te
                </Card.Title>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Nome</th>
                      <th className="text-center">Cognome</th>
                      <th className="text-center">Ruolo</th>
                      <th className="text-center">Mansioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coworkers.length > 0 ? (
                      coworkers.map((colleague, index) => (
                        <tr key={index}>
                          <td>{colleague.userName}</td>
                          <td>{colleague.userSurname}</td>
                          <td>{colleague.roleNames}</td>
                          <td>{colleague.tasks}</td>
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
