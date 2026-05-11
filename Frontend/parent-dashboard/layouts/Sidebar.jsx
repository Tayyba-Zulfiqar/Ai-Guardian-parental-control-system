import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck, LogOut, ChevronLeft, ChevronRight, AlertCircle
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
        title={null} // We'll handle the header inside the body for a more modern centered look
        size="small"
        footer={null} // We'll handle buttons inside the body for better centering
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          padding: '10px 0 20px 0'
        }}>
          {/* Professional Icon Container */}
          <div style={{ 
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', 
            color: '#dc2626', 
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 16px -4px rgba(220, 38, 38, 0.15)'
          }}>
            <LogOut size={32} />
          </div>

          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            color: '#111827', 
            margin: '0 0 12px 0',
            letterSpacing: '-0.025em'
          }}>
            Confirm Sign Out
          </h2>
          
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1rem', 
            lineHeight: '1.5',
            margin: '0 0 32px 0',
            maxWidth: '280px'
          }}>
            Are you sure you want to log out? You'll need your credentials to sign back in.
          </p>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '12px', 
            width: '100%' 
          }}>
            <Button 
              variant="danger" 
              size="large"
              onClick={confirmLogout}
              style={{ width: '100%', borderRadius: '14px', fontWeight: 700 }}
            >
              Log Out
            </Button>
            <Button 
              variant="ghost" 
              size="large"
              onClick={() => setShowLogoutModal(false)}
              style={{ width: '100%', borderRadius: '14px', fontWeight: 600, color: '#6b7280' }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </Modal>

    </aside>
  );
};

export default Sidebar;