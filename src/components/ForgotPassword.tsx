import { useState } from "react"
import { forgotPassword } from "../services/authService"
import { Col, Container, Row, Form, Button } from "react-bootstrap"
import { CiWarning } from "react-icons/ci"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMsg("")
    setIsLoading(true)

    try {
      await forgotPassword(email)
      setSuccessMsg(
        "Email di recupero inviata con successo! Controlla la posta.",
      )
    } catch (err: unknown) {
      // Estraiamo il messaggio dall'errore
      let message = (err as Error).message

      // Personalizziamo il messaggio se è quello del token duplicato o del database
      if (
        message.includes("duplicazione") ||
        message.includes("already exists")
      ) {
        message =
          "Hai già richiesto un reset di recente. Controlla la tua casella di posta!"
      }

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container fluid className="background">
      <Row className="align-items-center justify-content-center vh-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <div className="bg-light p-3 rounded-5 border border-2 border-primary">
            <h1 className="fs-5 text-center mb-4">
              <span className="text-brand-orange fw-bold fs-1">You</span>
              <span className="text-brand-magenta fw-bold fs-1">Roster</span>
            </h1>

            <h2 className="text-primary fs-6 mb-3 text-center">
              Recupera Password
            </h2>
            <Form onSubmit={handleSubmit}>
              <div className="d-flex flex-column align-items-center">
                <Form.Group className="mb-3 w-75" controlId="formEmail">
                  <Form.Label className="text-dark">
                    Inserisci la tua email
                  </Form.Label>
                  <Form.Control
                    className="border border-1 border-secondary"
                    type="email"
                    placeholder="mario.rossi@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    required
                    autoComplete="off"
                  />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Invia
                </Button>
              </div>
            </Form>

            <div className="d-flex justify-content-center mt-3">
              {successMsg && (
                <div className="ssmall-text p-1 d-flex flex-column align-items-center justify-content-center text-success my-2 py-2 border border-success border-1 rounded-2 w-75">
                  <p className="text-center m-0">{successMsg}</p>
                </div>
              )}

              <div className="small-text p-1 d-flex flex-column align-items-center justify-content-center text-warning my-2 py-2 border border-warning border-1 rounded-2 w-75">
                <p className="mb-1">
                  <CiWarning size={30} />
                </p>
                {error.includes("non esiste nel nostro sistema") ? (
                  <>
                    L'email <strong className="fw-bold">{email}</strong> non
                    esiste nel nostro sistema
                  </>
                ) : (
                  error
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPassword
