import { BrowserRouter, Route, Routes } from "react-router"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import Registration from "./components/auth/Registration"
import RegistrationPending from "./components/auth/RegistrationPending"
import Login from "./components/auth/Login"
import LandingPage from "./components/landingPage/LandingPage"
import AdminDashBoard from "./components/admin/AdminDashboard"
import AdminOfficesContainer from "./components/admin/AdminOfficesContainer"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 background2">
      <BrowserRouter>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/dashboard/admin" element={<AdminDashBoard />} />
            <Route path="/offices/admin" element={<AdminOfficesContainer />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/registration-pending"
              element={<RegistrationPending />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
