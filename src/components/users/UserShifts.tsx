import { Col, Container, Row, Form, Card, Table } from "react-bootstrap"
import { UserNavbar } from "./UserNavbar"

export const UserShifts = () => {
  return (
    <>
      <UserNavbar />
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center flex-grow-1 my-2"
      >
        {/* TITOLO */}
        <Row className="w-100 mb-3 justify-content-center">
          <Col xs={12} md={11} className="ps-0">
            <div className="text-start">
              <h3 className="small-title text-dark mb-0">I tuoi turni</h3>
            </div>
          </Col>
        </Row>
        {/*DATE DA SELEZIONARE */}
        <Row className="w-100 mb-3 justify-content-center">
          <Col xs={12} md={11} className="ps-0">
            <Card className="p-3 border border-1 border-secondary">
              <Form className="d-flex">
                <Form.Group className="mb-3 me-3" controlId="FormStartDate">
                  <Form.Label className="small-text text-muted">
                    Dalla data
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="FormEndDate">
                  <Form.Label className="small-text text-muted">
                    Alla data
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
        {/*TABELLA TURNI */}
        <Row className="w-100 mb-3 justify-content-center">
          <Col xs={12} md={11} className="ps-0">
            <Card className="p-3 border border-1 border-secondary">
              <Table
                bordered
                hover
                responsive
                className="text-center align-middle"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>DATA</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GIORNO</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
