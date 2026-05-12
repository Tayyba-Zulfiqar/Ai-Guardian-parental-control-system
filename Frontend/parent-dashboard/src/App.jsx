import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Alerts from "../pages/Alerts/Alerts";
import ChildActivity from "../pages/Child-Activity/ChildActivity";
import ScreenTime from "../pages/Screen-Time/ScreenTime";
import ContentReports from "../pages/Content-Reports/ContentReports";
import FamilyProfile from "../pages/Family-Profile/FamilyProfile";
import NotFound from "../pages/Page-Not-Found/NotFound";
import AppControls from "../pages/App-Controls/AppControls";
import ParentAccount from "../pages/Parent-Account/ParentAccount";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import NoChild from "../pages/NoChild/NoChild";
import ConnectChild from "../pages/ConnectChild/ConnectChild";

import { AuthProvider } from "../context/AuthContext";
import { ChildProvider } from "../context/ChildContext";

import PublicRoute from "../components/common/Routes/PublicRoute";
import ProtectedRoute from "../components/common/Routes/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <ChildProvider>
        <ScrollToTop />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          {/* ✅ CONNECT CHILD MUST BE OUTSIDE CHILD-CHECK PROTECTION */}
          <Route element={<ProtectedRoute />}>
            <Route path="/no-child" element={<NoChild />} />
          </Route>

          {/* CONNECT CHILD ROUTE (NO CHILD CHECK HERE) */}
          <Route element={<ProtectedRoute allowNoChild />}>
            <Route element={<AuthLayout />}>
              <Route path="/connect-child" element={<ConnectChild />} />
            </Route>
          </Route>

          {/* DASHBOARD ROUTES (FULL PROTECTION) */}
          <Route element={<ProtectedRoute requireChild />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/child-activity" element={<ChildActivity />} />
              <Route path="/app-controls" element={<AppControls />} />
              <Route path="/screen-time" element={<ScreenTime />} />
              <Route path="/family-profiles" element={<FamilyProfile />} />
              <Route path="/content-reports" element={<ContentReports />} />
              <Route path="/parent-account" element={<ParentAccount />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </ChildProvider>
    </AuthProvider>
  );
}