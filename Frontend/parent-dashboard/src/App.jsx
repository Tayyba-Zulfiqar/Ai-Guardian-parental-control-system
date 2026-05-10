import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Alerts from "../pages/Alerts/Alerts";
import ChildActivity from "../pages/Child-Activity/ChildActivity";
import ScreenTime from "../pages/Screen-Time/ScreenTime";
import ContentReports from "../pages/Content-Reports/ContentReports";
import FamilyProfile from '../pages/Family-Profile/FamilyProfile';
import NotFound from "../pages/NotFound";
import AppControls from "../pages/App-Controls/AppControls";
import ParentAccount from "../pages/Parent-Account/ParentAccount";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts/:childId" element={<Alerts />} />
        <Route path="/child-activity/:childId" element={<ChildActivity />} />
        <Route path="/app-controls/:childId" element={<AppControls />} />
        <Route path="/screen-time/:childId" element={<ScreenTime />} />
        <Route path="/family-profiles/:childId" element={<FamilyProfile />} />
        <Route path="/content-reports" element={<ContentReports />} />
        <Route path="/content-reports/:childId" element={<ContentReports />} />
        <Route path="/parent-account" element={<ParentAccount />} />
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}