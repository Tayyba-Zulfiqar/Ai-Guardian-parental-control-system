import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Alerts from "../pages/Alerts/Alerts";
import ChildActivity from "../pages/Child-Activity/ChildActivity";
import ScreenTime from "../pages/Screen-Time/ScreenTime";
import ContentReports from "../pages/Content-Reports/ContentReports";
import FamilyProfile from '../pages/Family-Profile/FamilyProfile';
import NotFound from "../pages/Page-Not-Found/NotFound";
import AppControls from "../pages/App-Controls/AppControls";
import ParentAccount from "../pages/Parent-Account/ParentAccount";

import { AuthProvider } from '../context/AuthContext';
import { ChildProvider } from '../context/ChildContext';
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import NoChild from '../pages/NoChild/NoChild';
import ConnectChild from '../pages/ConnectChild/ConnectChild';

export default function App() {
  return (
    <AuthProvider>
      <ChildProvider>
        <ScrollToTop />
        <Routes>
          {/* Unprotected Auth Layout Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Unprotected but Layoutless NoChild */}
          <Route path="/no-child" element={<NoChild />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            
            {/* Protected routes WITHOUT sidebar */}
            <Route element={<AuthLayout />}>
              <Route path="/connect-child" element={<ConnectChild />} />
            </Route>

            {/* Protected routes WITH sidebar */}
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