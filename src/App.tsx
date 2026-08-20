import { BrowserRouter, Route, Routes } from "react-router"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import Registration from "./components/Registration"
import RegistrationPending from "./components/RegistrationPending"
import Login from "./components/Login"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/registration" element={<Registration />} />
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
