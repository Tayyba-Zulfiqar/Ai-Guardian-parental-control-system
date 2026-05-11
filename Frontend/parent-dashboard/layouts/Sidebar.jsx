import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import './Sidebar.css';
import { NAV_ITEMS } from '../data/Layout/navItems';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal/Modal';
import Button from '../components/common/Button/Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutModal(false);
  };

  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>

      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon-wrapper">
            <ShieldCheck size={24} color="white" />
          </div>
          {!isCollapsed && (
            <div className="logo-text">
              <span className="brand-name">AI Guardian</span>
              <span className="brand-subtext">Parent Dashboard</span>
            </div>
          )}
        </div>
        <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-item-active' : ''}`}
              >
                <Icon className="nav-icon" size={20} />
                {!isCollapsed && <span className="nav-label">{name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogoutClick}>
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        size="small"
        footer={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmLogout}>
              Logout
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to log out of your account?</p>
      </Modal>

    </aside>
  );
};

export default Sidebar;