import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/Login"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
