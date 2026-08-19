import { useState } from "react"
import { useNavigate } from "react-router"
import { loginCall } from "../services/authService"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { PiUserCircleThin } from "react-icons/pi"
import { CiWarning } from "react-icons/ci"
import "../styles/login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const storedPhoto = localStorage.getItem("photoUrl")
  const userPhoto =
    storedPhoto && storedPhoto !== "undefined" ? storedPhoto : null

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await loginCall({ email, password })

      // 1. Salviamo i dati ricevuti dal backend nel localStorage
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      localStorage.setItem("photoUrl", response.photoUrl)
      localStorage.setItem("roleName", response.roleName)

      // 2. Smistamento in base al ruolo restituito
      switch (response.roleName) {
        case "ADMIN":
          navigate("/dashboard/admin")
          break
        case "HR":
          navigate("/dashboard/hr")
          break
        case "SHIFT_MANAGER":
          navigate("/dashboard/shift-manager")
          break
        case "COORDINATOR":
          navigate("/dashboard/coordinator")
          break
        case "AP E PAYROLL SPECIALIST":
          navigate("/dashboard/payroll")
          break
        case "STAFF":
        default:
          navigate("/dashboard/staff")
          break
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Credenziali errate")
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Row className="align-items-center justify-content-center vh-100">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="bg-light p-5 rounded-5 border border-2 border-secondary">
            <h1 className="fs-5 text-center mb-4">
              <span className="text-brand-orange fw-bold fs-1">You</span>
              <span className="text-brand-magenta fw-bold fs-1">Roster</span>
            </h1>

            <div className="mb-3">
              <div className="avatar-circle bg-light d-flex justify-content-center align-items-center">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt="Avatar Profilo"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <PiUserCircleThin size={90} className="text-secondary" />
                )}
              </div>
            </div>

            {error && (
              <div className="p-1 d-flex flex-column align-items-center justify-content-center text-warning my-4 py-2 border border-warning border-1 rounded-2">
                <p className="mb-1">
                  <CiWarning size={30} />
                </p>
                <p className="text-center m-0">
                  {error.includes("email") ? (
                    <>
                      L'email <strong className="fw-bold">{email}</strong> non
                      esiste nel nostro sistema
                    </>
                  ) : (
                    error
                  )}
                </p>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="text-dark">Email</Form.Label>
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
                  autoComplete="false"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="text-dark">Password</Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              <div>
                {error.includes("Credenziali non valide") && (
                  <a
                    href="/forgot-password"
                    className="text-warning text-decoration-underline mt-2"
                  >
                    Password dimenticata?
                  </a>
                )}
              </div>

              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
