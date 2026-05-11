import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import './Sidebar.css';
import { NAV_ITEMS } from '../data/Layout/navItems';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;