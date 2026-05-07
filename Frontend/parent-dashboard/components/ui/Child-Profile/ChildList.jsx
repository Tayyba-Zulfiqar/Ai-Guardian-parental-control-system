import React from 'react';
import { MoreVertical, Settings2, Smartphone, Tablet, Monitor } from 'lucide-react';
import './ChildList.css';

const ChildList = ({ children }) => {
  return (
    <div className="child-list-container">
      <div className="list-header">
        <h2 className="dashboard-section-title">Added Children</h2>
        <span className="count-badge">{children.length} devices linked</span>
      </div>

      <div className="child-grid">
        {children.map((child) => (
          <div key={child.id} className="child-item-card">
            <div className="item-main">
              <div className="avatar-circle">{child.avatar}</div>
              <div className="item-info">
                <h3 className="item-name">{child.name}</h3>
                <p className="item-meta">{child.age} years old</p>
              </div>
              <div className={`status-pill ${child.status.toLowerCase()}`}>
                {child.status}
              </div>
            </div>

            <div className="item-details">
              <div className="detail-row">
                <div className="detail-icon">
                  {React.createElement(child.deviceType, { size: 16 })}
                </div>
                <div className="detail-content">
                  <span className="detail-label">Device</span>
                  <span className="detail-value">{child.device}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon">
                  <div className={`active-dot ${child.status.toLowerCase()}`}></div>
                </div>
                <div className="detail-content">
                  <span className="detail-label">Last Active</span>
                  <span className="detail-value">{child.lastActive}</span>
                </div>
              </div>
            </div>

            <div className="item-actions">
              <button className="action-btn-secondary">
                <Settings2 size={18} />
                <span>Settings</span>
              </button>
              <button className="action-btn-icon">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildList;
