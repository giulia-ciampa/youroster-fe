import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { PiUserCircleThin } from "react-icons/pi"
import "../../styles/login.css"
import { IoIosArrowDown } from "react-icons/io"
import { NavLink } from "react-router"

const AdminNavbar = () => {
  const storedPhoto = localStorage.getItem("photoUrl")
  const userPhoto =
    storedPhoto && storedPhoto !== "undefined" ? storedPhoto : null

  const userAvatar = userPhoto ? (
    <img
      src={userPhoto}
      alt="Admin Avatar"
      className="avatar-circle"
      style={{ width: "35px", height: "35px", objectFit: "cover" }}
    />
  ) : (
    <PiUserCircleThin size={32} className="text-white" />
  )

  return (
    <Navbar expand="sm" className="background-brand px-3">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* PARTE SINISTRA: Logo YouRoster (desktop) o Menu a tendina (mobile) */}
        <div className="d-flex align-items-center">
          <Navbar.Brand
            href="#"
            className="fw-bold tracking-wide text-light d-none d-sm-inline me-3"
          >
            YouRoster
          </Navbar.Brand>

          {/* Dropdown mobile */}
          <NavDropdown
            title={
              <span className="text-light fw-bold">
                YouRoster <IoIosArrowDown />
              </span>
            }
            id="mobile-menu-dropdown"
            className="d-sm-none myDropDown"
          >
            <NavDropdown.Item
              as={NavLink}
              to={"/dashboard/admin"}
              className="text-dark"
            >
              Dashboard
            </NavDropdown.Item>
            <NavDropdown.Item href="#utenti" className="text-dark">
              Utenti
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={"/offices/admin"}
              className="text-dark"
            >
              Uffici
            </NavDropdown.Item>
            <NavDropdown.Item href="#ruoli" className="text-dark">
              Ruoli
            </NavDropdown.Item>
            <NavDropdown.Item href="#turni" className="text-dark">
              Turni
            </NavDropdown.Item>
          </NavDropdown>

          {/* Link desktop */}
          <Nav className="d-none d-sm-flex flex-row gap-3">
            <Nav.Link
              as={NavLink}
              to={"/dashboard/admin"}
              className="text-light"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link href="#utenti" className="text-light">
              Utenti
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/offices/admin"} className="text-light">
              Uffici
            </Nav.Link>
            <Nav.Link href="#ruoli" className="text-light">
              Ruoli
            </Nav.Link>
            <Nav.Link href="#turni" className="text-light">
              Turni
            </Nav.Link>
          </Nav>
        </div>

        {/* PARTE DESTRA: Avatar dell'admin (Sempre visibile e bloccato a destra) */}
        <Nav>
          <NavDropdown
            title={userAvatar}
            id="admin-nav-dropdown"
            align="end"
            className="custom-avatar-dropdown"
          >
            <NavDropdown.Item href="#action/profile">
              Il mio profilo
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-danger">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar
