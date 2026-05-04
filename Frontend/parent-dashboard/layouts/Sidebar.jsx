import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Activity, Clock, ShieldCheck, Bell, Settings,
  User, FileText, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Child Activity', path: '/child-activity/1', icon: Activity },
  { name: 'Screen Time', path: '/screen-time/1', icon: Clock },
  { name: 'App Controls', path: '/controls/1', icon: ShieldCheck },
  { name: 'Alerts', path: '/alerts/1', icon: Bell },
  { name: 'Content Reports', path: '/content-reports/1', icon: FileText },
  { name: 'Child Profile', path: '/child-profile/1', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        <button className="logout-button">
          <LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;