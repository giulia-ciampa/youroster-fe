import { useEffect, useState } from "react"
import { fetchActiveOffices } from "../../services/officeService"
import type { OfficeResponseDTO } from "../../types/office"
import { Col, Container, Row, Form, Button } from "react-bootstrap"

export const Offices = () => {
  const [officesList, setOfficesList] = useState<OfficeResponseDTO[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const offices = await fetchActiveOffices()
        setOfficesList(offices)
      } catch (err) {
        console.error("Errore nel caricamento delle sedi", err)
      }
    }

    fetchOffices()
  }, [])

  const filteredOffices = officesList.filter((office) =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-success fw-bold"

      case "TEMPORARILY_CLOSED":
      case "PERMANENTLY_CLOSED":
        return "text-danger fw-bold"

      default:
        return "text-dark"
    }
  }

  return (
    <Container fluid className="px-3 min-vh-100">
      <Row className="d-flex justify-content-center mt-4">
        <Col xs={12} lg={10}>
          <div className="d-flex align-items-center">
            <Form.Control
              className="input w-25 mt-2 border border-1 border-secondary"
              type="text"
              placeholder="Cerca ufficio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button className="btn-custom2 ms-1 mt-2">Cerca</Button>
          </div>
        </Col>
      </Row>

      <Row className="my-5 d-flex justify-content-center align-items-center">
        <Col xs={12} lg={10}>
          <div className="card shadow-sm border border-1 border-secondary">
            <div className="p-3">
              <h4 className="text-dark mb-3 small-title">Uffici attivi</h4>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-dark smaller-text">Nome</th>
                      <th className="text-dark smaller-text">Indirizzo</th>
                      <th className="text-dark smaller-text">Apertura</th>
                      <th className="text-dark smaller-text">Chiusura</th>
                      <th className="text-dark smaller-text">Dettagli</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOffices.length > 0 ? (
                      filteredOffices.map((office) => (
                        <tr key={office.id}>
                          <td className="smaller-text text-nowrap">
                            {office.name}
                          </td>

                          <td className="smaller-text text-nowrap">
                            {office.street} {office.houseNumber} -{" "}
                            {office.zipCode}
                          </td>

                          <td className="ps-3 smaller-text">
                            {office.openingTime}
                          </td>

                          <td className="ps-3 smaller-text">
                            {office.closingTime}
                          </td>

                          <td className={getStatusVariant(office.status)}>
                            {office.status}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          Nessun ufficio trovato
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
  )
}
