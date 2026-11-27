import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Journals from "./pages/Journals";
import Documents from "./pages/Documents";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/journals"
            element={<Journals />}
          />

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;