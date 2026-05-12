import React from 'react';
import { User } from 'lucide-react';
import './ChildList.css';

const ChildList = ({ children }) => {
  return (
    <div className="child-list-container">
      <div className="list-header">
        <h2 className="dashboard-section-title">Added Children</h2>
        <span className="count-badge">{children.length} devices linked</span>
      </div>

      <div className="child-grid">
        {children.map((child) => {
          const isCurrentlyActive = child.status === 'Currently Active' || child.status.toLowerCase() === 'online';
          
          return (
            <div key={child.id} className="child-item-card">
              <div className="item-main">
                <div className="avatar-circle">{child.avatar}</div>
                <div className="item-info">
                  <h3 className="item-name">{child.name}</h3>
                  <p className="item-meta">{child.age} years old</p>
                </div>
                <div className={`status-pill ${isCurrentlyActive ? 'online' : 'offline'}`}>
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
                    <User size={16} />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Gender</span>
                    <span className="detail-value" style={{ textTransform: 'capitalize' }}>{child.gender}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildList;
