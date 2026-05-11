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

          {/*  PUBLIC ROUTES
              (only for NOT logged-in users) */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          {/*PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>

            {/* Layout-less protected page */}
            <Route path="/no-child" element={<NoChild />} />

            {/* Auth layout protected route */}
            <Route element={<AuthLayout />}>
              <Route path="/connect-child" element={<ConnectChild />} />
            </Route>

            {/* Dashboard layout protected routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts/:childId" element={<Alerts />} />
              <Route path="/child-activity/:childId" element={<ChildActivity />} />
              <Route path="/app-controls/:childId" element={<AppControls />} />
              <Route path="/screen-time/:childId" element={<ScreenTime />} />
              <Route path="/family-profiles/:childId" element={<FamilyProfile />} />
              <Route path="/content-reports" element={<ContentReports />} />
              <Route path="/content-reports/:childId" element={<ContentReports />} />
              <Route path="/parent-account" element={<ParentAccount />} />
            </Route>

          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </ChildProvider>
    </AuthProvider>
  );
}