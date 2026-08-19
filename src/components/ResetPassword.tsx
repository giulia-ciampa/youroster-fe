import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { resetPassword } from "../services/authService"
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap"

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)
    setError("")

    if (!token) {
      setError("Token di reset mancante.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Le password non coincidono.")
      return
    }

    try {
      const data = await resetPassword(token, newPassword)
      setMessage(data)
      setTimeout(() => navigate("/login"), 3000)
    } catch (err: unknown) {
      setError((err as Error).message)
      setIsLoading(false)
    }
  }

  return (
    <Container fluid className="background">
      <Row className="align-items-center justify-content-center vh-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <div className="bg-light p-3 rounded-5 border border-2 border-warning">
            <h1 className="fs-5 text-center mb-4">
              <span className="text-brand-orange fw-bold fs-1">You</span>
              <span className="text-brand-magenta fw-bold fs-1">Roster</span>
            </h1>
            {!token ? (
              <Alert className="text-warning text-center">
                Non sei abilitato ad accedere a questa pagina.
              </Alert>
            ) : (
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
                      autoComplete="false"
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
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Login
                  </Button>
                </div>
              </Form>
            )}
            {message && (
              <p style={{ color: "green", marginTop: "15px" }}>{message}</p>
            )}
            {error && (
              <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword
