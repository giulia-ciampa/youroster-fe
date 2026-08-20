import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { forgotPassword, resetPassword } from "../services/authService"
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap"

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [emailForRecovery, setEmailForRecovery] = useState("")

  const [errorsList, setErrorsList] = useState<string[]>([])

  // Funzione per il reset della password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)
    setError("")
    setErrorsList([])

    if (!token) {
      setError("Token di reset mancante.")
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Le password non coincidono.")
      setIsLoading(false)
      return
    }

    try {
      const data = await resetPassword(token, newPassword)
      setMessage(data)
      setTimeout(() => navigate("/login"), 3000)
    } catch (err: unknown) {
      const errorMsg = (err as Error).message
      try {
        const parsed = JSON.parse(errorMsg)
        setError(parsed.message || errorMsg)
        // Se il backend restituisce un array di errori di validazione, li salviamo
        if (parsed.errorsList && Array.isArray(parsed.errorsList)) {
          setErrorsList(parsed.errorsList)
        }
      } catch {
        setError(errorMsg || "Errore durante la richiesta.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Funzione per inviare la nuova email se il token è scaduto
  const handleResendEmail = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const data = await forgotPassword(emailForRecovery)
      setMessage(
        data ||
          "Email di recupero inviata con successo! Controlla la tua posta.",
      )
    } catch (err: unknown) {
      const errorMsg = (err as Error).message
      try {
        const parsed = JSON.parse(errorMsg)
        setError(parsed.message || errorMsg)
      } catch {
        setError(errorMsg || "Errore durante l'invio dell'email.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container fluid className="background">
      <Row className="align-items-center justify-content-center vh-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <div className="bg-light p-3 rounded-5 border border-2 border-secondary">
            <h1 className="fs-5 text-center mb-4">
              <span className="text-brand-orange fw-bold fs-1">You</span>
              <span className="text-brand-magenta fw-bold fs-1">Roster</span>
            </h1>

            {!token ? (
              <div className="text-warning text-center">
                Non sei abilitato ad accedere a questa pagina.
              </div>
            ) : error.includes("recupero") ? (
              // --- FORM PER RICHIEDERE UNA NUOVA EMAIL SE IL TOKEN È SCADUTO ---
              <Form onSubmit={handleResendEmail}>
                <div className="d-flex flex-column align-items-center">
                  <Form.Group
                    className="mb-3 w-75"
                    controlId="formRecoveryEmail"
                  >
                    <Form.Label className="text-dark">
                      Inserisci la tua email
                    </Form.Label>
                    <Form.Control
                      className="border border-1 border-secondary"
                      type="email"
                      placeholder="nome@esempio.com"
                      value={emailForRecovery}
                      onChange={(e) => setEmailForRecovery(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Invio in corso..." : "Invia Nuova Email"}
                  </Button>
                </div>
              </Form>
            ) : (
              // --- FORM ORIGINALE PER IL RESET DELLA PASSWORD ---
              <Form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <Form.Group className="mb-3 w-75" controlId="formNewPassword">
                    <Form.Label className="text-dark">
                      Nuova password
                    </Form.Label>
                    <Form.Control
                      className="border border-1 border-secondary"
                      type="password"
                      placeholder="Nuova password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                        setError("")
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 w-75"
                    controlId="formConfirmPassword"
                  >
                    <Form.Label className="text-dark">
                      Conferma nuova password
                    </Form.Label>
                    <Form.Control
                      className="border border-1 border-secondary"
                      type="password"
                      placeholder="Conferma password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        setError("")
                      }}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    Salva Password
                  </Button>
                </div>
              </Form>
            )}

            <div className="text-center d-flex justify-content-center">
              {message && (
                <p className="text-secondary border border-1 border-secondary p-1 mt-4 rounded-2 p-2">
                  {message}
                </p>
              )}
            </div>

            <div className="text-center d-flex justify-content-center">
              {error && (
                <div className="text-warning border border-1 border-warning p-2 mt-4 rounded-2 w-75">
                  {error.toLowerCase().includes("validation") &&
                  errorsList.length > 0 ? (
                    // Se è un errore di validazione, mostriamo SOLO la lista degli errori specifici
                    <ListGroup
                      variant="flush"
                      className="mb-0 text-start small"
                    >
                      {errorsList.map((errItem, index) => (
                        <ListGroupItem
                          key={index}
                          className="bg-transparent text-warning border-0"
                        >
                          {errItem}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  ) : (
                    // Altrimenti mostriamo il normale messaggio di errore generico
                    <p className="mb-0">{error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword
