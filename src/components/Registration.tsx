import { useState } from "react"
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Dropdown,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap"
import { registration } from "../services/authService"
import { useNavigate } from "react-router"
import "../styles/registration.css"
import "../styles/mobileText.css"

const Registration = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [taxCode, setTaxCode] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [placeOfBirth, setPlaceOfBirth] = useState("")
  const [nationality, setNationality] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [houseNumber, setHouseNumber] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [iban, setIban] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [documentNumber, setDocumentNumber] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [documentFront, setDocumentFront] = useState<File | null>(null)
  const [documentBack, setDocumentBack] = useState<File | null>(null)
  const [taxCodeFront, setTaxCodeFront] = useState<File | null>(null)
  const [taxCodeBack, setTaxCodeBack] = useState<File | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [errorsList, setErrorsList] = useState<string[]>([])
  const [warningMessage, setWarningMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await registration({
        name,
        surname,
        taxCode,
        dateOfBirth,
        placeOfBirth,
        nationality,
        phoneNumber,
        streetAddress,
        houseNumber,
        zipCode,
        city,
        province,
        iban,
        documentNumber,
        documentType,
        issueDate,
        expirationDate,
        documentFront,
        documentBack,
        taxCodeFront,
        taxCodeBack,
        email,
        password,
        confirmPassword,
      })

      navigate("/registration-pending")
    } catch (err: unknown) {
      const errorMsg = (err as Error).message
      try {
        const parsed = JSON.parse(errorMsg)

        if (
          parsed.errorsList &&
          Array.isArray(parsed.errorsList) &&
          parsed.errorsList.length > 0
        ) {
          setErrorsList(parsed.errorsList)
          setError(parsed.message || "Errore di validazione")
          setWarningMessage("") // Puliamo eventuali warning precedenti
        } else {
          // Se non c'è una lista di errori ma c'è un messaggio (es. password non coincidenti)
          setWarningMessage(parsed.message || "Attenzione")
          setError("")
          setErrorsList([])
        }
      } catch {
        setError(errorMsg || "Errore durante la registrazione.")
        setWarningMessage("")
        setErrorsList([])
      } finally {
        setIsLoading(false)
      }
    }
  }

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

          {/* Footer del pannello sinistro */}
          <div className="z-1">
            <small className="opacity-75">
              YouRoster - {new Date().getFullYear()}
            </small>
          </div>
        </Col>

        {/* COLONNA DESTRA: Il Form di Registrazione */}
        <Col
          xs={12}
          lg={6}
          className="d-flex flex-column align-items-center justify-content-start background2 p-4 p-md-5 overflow-auto vh-100"
        >
          <div className="d-flex flex-column">
            <h1 className="fs-5 text-center mb-4 d-lg-none">
              <span className="text-brand-orange fw-bold fs-1">You</span>
              <span className="text-brand-magenta fw-bold fs-1">Roster</span>
            </h1>
            <div className="w-100" style={{ maxWidth: "420px" }}>
              <div className="mb-4 text-center text-lg-start">
                <h2 className="fw-bold mb-1 text-primary text-center small-title">
                  Benvenuto
                </h2>
                <p className="text-muted small-text">
                  Inserisci i tuoi dati per proseguire con la registrazione.
                </p>
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-center p-4 border border-1 border-primary rounded-4 border-lg-0 m-2 m-lg-0 shadow-sm">
              {/* NOME*/}
              <Form.Group className="mb-3 w-100" controlId="formName">
                <Form.Label className="text-dark small-text">Nome</Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>
              {/* COGNOME*/}
              <Form.Group className="mb-3 w-100 " controlId="formSurname">
                <Form.Label className="text-dark small-text">
                  Cognome
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Cognome"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* CODICE FISCALE*/}
              <Form.Group className="mb-3 w-100" controlId="formTaxCode">
                <Form.Label className="text-dark small-text">
                  Codice Fiscale
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Codice fiscale"
                  value={taxCode}
                  onChange={(e) => {
                    setTaxCode(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* DATA DI NASCITA*/}
              <Form.Group className="mb-3 w-100" controlId="formDateOfBirth">
                <Form.Label className="text-dark small-text">
                  Data di nascita
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="date"
                  placeholder="Data di nascita"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* LUOGO DI NASCITA*/}
              <Form.Group className="mb-3 w-100" controlId="formPlaceOfBirth">
                <Form.Label className="text-dark small-text">
                  Luogo di nascita
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Luogo di nascita"
                  value={placeOfBirth}
                  onChange={(e) => {
                    setPlaceOfBirth(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* NAZIONALITA'*/}
              <Form.Group className="mb-3 w-100" controlId="formNationality">
                <Form.Label className="text-dark small-text">
                  Nazionalità
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Nazionalità"
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* NUMERO DI TELEFODNO*/}
              <Form.Group className="mb-3 w-100" controlId="formPhoneNumber">
                <Form.Label className="text-dark small-text">
                  Numero di telefono
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="tel"
                  placeholder="Numero di telefono"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* INDIRIZZO*/}
              <Form.Group className="mb-3 w-100" controlId="formStreetAddress">
                <Form.Label className="text-dark small-text">
                  Via/Piazza
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Via/Piazza"
                  value={streetAddress}
                  onChange={(e) => {
                    setStreetAddress(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* NUMERO CIVICO*/}
              <Form.Group className="mb-3 w-100" controlId="formHouseNumber">
                <Form.Label className="text-dark small-text">
                  Numero civico
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Via/Piazza"
                  value={houseNumber}
                  onChange={(e) => {
                    setHouseNumber(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* CODICE POSTALE*/}
              <Form.Group className="mb-3 w-100" controlId="formZipCode">
                <Form.Label className="text-dark small-text">
                  Codice postale
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  inputMode="numeric"
                  placeholder="Codice postale"
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* CITTA'*/}
              <Form.Group className="mb-3 w-100" controlId="formCity">
                <Form.Label className="text-dark small-text">Città</Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Città"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* PROVINCIA*/}
              <Form.Group className="mb-3 w-100" controlId="formProvince">
                <Form.Label className="text-dark small-text">
                  Provincia
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Provincia"
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* IBAN*/}
              <Form.Group className="mb-3 w-100" controlId="formIban">
                <Form.Label className="text-dark small-text">Iban</Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Iban"
                  value={iban}
                  onChange={(e) => {
                    setIban(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* TIPO DOCUMENTO*/}
              <Form.Group className="mb-3 w-100" controlId="formDocumentType">
                <Form.Label className="text-dark small-text">
                  Tipo di documento
                </Form.Label>
                <Dropdown
                  onSelect={(eventKey) => {
                    if (eventKey) {
                      setDocumentType(eventKey)
                      setError("")
                    }
                  }}
                >
                  <Dropdown.Toggle
                    className="w-100 bg-white text-dark text-start border border-1 border-secondary d-flex justify-content-between align-items-center"
                    id="dropdown-document-type"
                  >
                    {documentType === "IDENTITY_CARD"
                      ? "Carta d'Identità"
                      : documentType === "PASSPORT"
                        ? "Passaporto"
                        : documentType === "DRIVING_LICENSE"
                          ? "Patente"
                          : "Seleziona il tipo di documento"}
                  </Dropdown.Toggle>

                  {/* menu che si apre */}
                  <Dropdown.Menu className="w-100 small-text">
                    <Dropdown.Item eventKey="IDENTITY_CARD">
                      Carta d'Identità
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="PASSPORT">
                      Passaporto
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="DRIVING_LICENSE">
                      Patente
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {/* NUMERO DOCUMENTO*/}
              <Form.Group className="mb-3 w-100" controlId="formDocumentNumber">
                <Form.Label className="text-dark small-text">
                  Numero di documento
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="text"
                  placeholder="Numero di documento"
                  value={documentNumber}
                  onChange={(e) => {
                    setDocumentNumber(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* DATA DI EMISSIONE*/}
              <Form.Group className="mb-3 w-100" controlId="formIssueDate">
                <Form.Label className="text-dark small-text">
                  Data di emissione
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="date"
                  placeholder="Data di emissione"
                  value={issueDate}
                  onChange={(e) => {
                    setIssueDate(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* DATA DI SCADENZA*/}
              <Form.Group className="mb-3 w-100" controlId="formExpirationDate">
                <Form.Label className="text-dark small-text">
                  Data di scadenza
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="date"
                  placeholder="Data di scadenza"
                  value={expirationDate}
                  onChange={(e) => {
                    setExpirationDate(e.target.value)
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* FRONTE DOCUMENTO*/}
              <Form.Group className="mb-3 w-100" controlId="formDocumentFront">
                <Form.Label className="text-dark small-text">
                  Fronte documento
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="file"
                  placeholder="Fronte documento"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    if (target.files && target.files[0]) {
                      setDocumentFront(target.files[0])
                    }
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* RETRO DOCUMENTO*/}
              <Form.Group className="mb-3 w-100" controlId="formDocumentBack">
                <Form.Label className="text-dark small-text">
                  Retro documento
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="file"
                  placeholder="Retro documento"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    if (target.files && target.files[0]) {
                      setDocumentBack(target.files[0])
                    }
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* FRONTE CODICE FISCALE*/}
              <Form.Group className="mb-3 w-100" controlId="formTaxCodeFront">
                <Form.Label className="text-dark small-text">
                  Fronte codice fiscale
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="file"
                  placeholder="Fronte codice fiscale"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    if (target.files && target.files[0]) {
                      setTaxCodeFront(target.files[0])
                    }
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* RETRO CODICE FISCALE*/}
              <Form.Group className="mb-3 w-100" controlId="formTaxCodeBack">
                <Form.Label className="text-dark small-text">
                  Retro codice fiscale
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="file"
                  placeholder="Retro codice fiscale"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    if (target.files && target.files[0]) {
                      setTaxCodeBack(target.files[0])
                    }
                    setError("")
                  }}
                  required
                />
              </Form.Group>

              {/* EMAIL*/}
              <Form.Group className="mb-3 w-100" controlId="formEmail">
                <Form.Label className="text-dark small-text">Email</Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  required
                  autoComplete="false"
                />
              </Form.Group>

              {/* PASSWORD*/}
              <Form.Group className="mb-3 w-100" controlId="formPassword">
                <Form.Label className="text-dark small-text">
                  Password
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              {/* CONFERMA PASSWORD*/}
              <Form.Group
                className="mb-3 w-100"
                controlId="formConfirmPassword"
              >
                <Form.Label className="text-dark small-text">
                  Conferma password
                </Form.Label>
                <Form.Control
                  className="border border-1 border-secondary"
                  type="password"
                  placeholder="Conferma password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError("")
                  }}
                  required
                  autoComplete="new-password"
                />
              </Form.Group>
            </div>

            <div className="d-flex flex-column align-items-center mx-auto">
              {error.toLowerCase().includes("validation") &&
              errorsList.length > 0 ? (
                // Se è un errore di validazione, mostriamo SOLO la lista degli errori specifici
                <div className="border border-1 border-warning rounded-4">
                  <ListGroup variant="flush" className="mb-0 text-start">
                    {errorsList.map((errItem, index) => (
                      <ListGroupItem
                        key={index}
                        className="bg-transparent text-warning border-0 small-text"
                      >
                        {errItem}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
              ) : (
                // Altrimenti mostriamo il normale messaggio di errore generico
                <p className="mb-0">{error}</p>
              )}
            </div>

            {warningMessage && (
              <div className="mb-3 text-warning text-center">
                {warningMessage}
              </div>
            )}

            <div className="d-flex justify-content-center mt-3">
              <Button
                variant="outline-primary"
                type="submit"
                disabled={isLoading}
              >
                Registrati
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Registration
