import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const DashboardLayout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content-wrapper">
        <main className="content-section">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
