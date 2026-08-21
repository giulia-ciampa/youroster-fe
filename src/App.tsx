import { BrowserRouter, Route, Routes } from "react-router"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import Registration from "./components/Registration"
import RegistrationPending from "./components/RegistrationPending"
import Login from "./components/Login"
import LandingPage from "./components/LandingPage"
import AdminDashBoard from "./components/AdminDashboard"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 background2">
      <BrowserRouter>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/dashboard/admin" element={<AdminDashBoard />} />
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
