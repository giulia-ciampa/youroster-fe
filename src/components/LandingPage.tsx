import { Button, Col, Container, Row } from "react-bootstrap"
import DynamicSlogan from "./DynamicSlogan"
import { useNavigate } from "react-router"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <Container fluid className="min-vh-100 p-0">
      <Row className="g-0 min-vh-100">
        {/* COLONNA SINISTRA: Brand, Mood e Identità visiva */}
        <Col
          xs={12}
          lg={6}
          className="background-brand d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden"
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10 bg-grid"></div>

          {/* Top Logo */}
          <div className="z-1">
            <h3 className="fw-bold tracking-wide">YouRoster</h3>
          </div>

          {/* Centro: Frase d'impatto */}
          <div className="z-1 my-auto py-5">
            <h1 className="display-4 fw-bold mb-3">
              La gestione turni, resa semplice.
            </h1>
            <p className="lead opacity-75">
              Coordina il personale, ottimizza le risorse e gestisci ogni team
              con un'interfaccia pensata per chi lavora.
            </p>
          </div>

          {/* Componente dinamico con le tue frasi */}
          <div className="lead opacity-75">
            <DynamicSlogan />
          </div>

          {/* Footer del pannello sinistro */}
          <div className="z-1">
            <small className="opacity-75">
              YouRoster - {new Date().getFullYear()}
            </small>
          </div>
        </Col>

        {/* COLONNA DESTRA: Login */}
        <Col
          xs={12}
          lg={6}
          className="d-flex align-items-center justify-content-center background2 p-4 p-md-5 min-vh-100 position-relative overflow-hidden"
        >
          {/* Sfumature decorative di sfondo */}
          <div className="bg-glow-container">
            <div className="glow-blob-1"></div>
            <div className="glow-blob-2"></div>
          </div>

          <div className="d-flex flex-column border border-3 rounded-2 border-primary p-4 w-75 shadow-lg">
            <h1 className="fs-5 text-center mb-4 d-lg-none">
              <span className="text-brand-orange fw-bold fs-1">You</span>
              <span className="text-brand-magenta fw-bold fs-1">Roster</span>
            </h1>
            <div className="w-100">
              <div className="mb-4 text-center text-lg-start">
                <h2 className="fw-bold mb-1 text-primary text-center small-title">
                  Il tuo spazio di lavoro<br></br> inizia da qui
                </h2>
                <p className="text-muted text-center small-text">
                  Come preferisci procedere?
                </p>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center mt-3">
              <Button
                className="border border-3 border-primary fw-bold small-text p-3 w-50 mb-2 shadow-sm"
                variant="outline-primary"
                type="submit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="border border-3 border-secondary fw-bold small-text p-3 w-50 mt-2 shadow-sm"
                variant="outline-secondary"
                type="submit"
                onClick={() => navigate("/registration")}
              >
                Registrati
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPage
