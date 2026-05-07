import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dasboard/Dashboard";
import Alerts from "../pages/Alerts";
import ChildActivity from "../pages/Child-Activity/ChildActivity";
import Controls from "../pages/Controls";
import ScreenTime from "../pages/ScreenTime";
import ChildProfile from "../pages/Child-Profile/ChildProfile";
import Settings from "../pages/Settings";
import ContentReports from "../pages/ContentReports";
import NotFound from "../pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts/:childId" element={<Alerts />} />
        <Route path="/child-activity/:childId" element={<ChildActivity />} />
        <Route path="/controls/:childId" element={<Controls />} />
        <Route path="/screen-time/:childId" element={<ScreenTime />} />
        <Route path="/child-profile/:childId" element={<ChildProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/content-reports/:childId" element={<ContentReports />} />
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}