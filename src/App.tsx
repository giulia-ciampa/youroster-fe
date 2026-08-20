import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
