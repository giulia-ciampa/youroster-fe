import { BrowserRouter, Route, Routes } from "react-router"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import Registration from "./components/auth/Registration"
import RegistrationPending from "./components/auth/RegistrationPending"
import Login from "./components/auth/Login"
import LandingPage from "./components/landingPage/LandingPage"
import AdminDashBoard from "./components/admin/AdminDashboard"
import AdminOfficesContainer from "./components/admin/AdminOfficesContainer"
import { UserOffices } from "./components/offices/UserOffices"
import { UserDashboard } from "./components/users/UserDashboard"
import { ShiftManagerDashboard } from "./components/shift manager/ShiftManagerDashboard"
import { ShiftManagerTurni } from "./components/shift manager/ShiftManagerTurni"
import { ShiftManagerOffices } from "./components/offices/ShiftManagerOffices"
import { ShiftManagerAssignment } from "./components/shift manager/ShiftManagerAssignment"
import { UserRequests } from "./components/users/UserRequests"
import { UserShifts } from "./components/users/UserShifts"
import { ShiftManagerRequests } from "./components/shift manager/ShiftManagerRequests"
import { ShiftManagerMyAssignment } from "./components/shift manager/ShiftManagerMyAssignments"
import { HrDashboard } from "./components/hr/HrDashboard"
import { HrRequestsToManage } from "./components/hr/HrRequestsToManage"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 background2">
      <BrowserRouter>
        <main className="d-flex flex-column flex-grow-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/registration-pending"
              element={<RegistrationPending />}
            />

            <Route path="/dashboard/staff" element={<UserDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashBoard />} />
            <Route
              path="/dashboard/shift-manager"
              element={<ShiftManagerDashboard />}
            />
            <Route path="/dashboard/hr" element={<HrDashboard />} />

            <Route
              path="/offices/shift-manager"
              element={<ShiftManagerOffices />}
            />

            <Route path="/offices/admin" element={<AdminOfficesContainer />} />
            <Route path="/offices/staff" element={<UserOffices />} />

            <Route
              path="/shifts/shift-manager"
              element={<ShiftManagerTurni />}
            />

            <Route
              path="/shifts-assignment/shift-manager"
              element={<ShiftManagerAssignment />}
            />

            <Route path="/requests/user" element={<UserRequests />} />
            <Route path="/shifts/user" element={<UserShifts />} />
            <Route
              path="/requests/shift-manager"
              element={<ShiftManagerRequests />}
            />
            <Route
              path="/shifts-assignment/my-assignments"
              element={<ShiftManagerMyAssignment />}
            />

            <Route path="/requests/hr" element={<HrRequestsToManage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
