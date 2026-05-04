
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User } from 'lucide-react';
import './MainLayout.css';

const MainLayout = () => {

  return (
    <div className="layout-container">
      <Sidebar />

      <div className="main-content-wrapper">
        <header className="top-header-bar">

          <div className="header-right">
            <div className="user-profile-summary">
              <div className="user-avatar-wrapper">
                <User size={16} />
              </div>
            </div>
          </div>

        </header>

        <main className="content-section">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;