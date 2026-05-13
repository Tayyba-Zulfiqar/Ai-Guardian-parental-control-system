import React from 'react';
import { User, Trash2, UserCheck } from 'lucide-react';
import './ChildList.css';

const ChildList = ({ childrenList, onRemoveChild, onSwitchChild }) => {
  return (
    <div className="child-list-container">
      <div className="list-header">
        <h2 className="dashboard-section-title">Added Children</h2>
        <span className="count-badge">{childrenList.length} devices linked</span>
      </div>

      <div className="child-grid">
        {childrenList.map((child) => {
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

              <div className="action-buttons-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  className={`switch-child-btn ${isCurrentlyActive ? 'active-disabled' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCurrentlyActive) {
                      onSwitchChild && onSwitchChild(child.id);
                    }
                  }}
                  disabled={isCurrentlyActive}
                  title={isCurrentlyActive ? "Already Active" : "Switch to this child"}
                >
                  <UserCheck size={14} />
                  <span className="btn-text">{isCurrentlyActive ? 'Currently Active' : 'Switch to Child'}</span>
                </button>

                <button 
                  className="remove-child-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveChild && onRemoveChild(child.id);
                  }}
                  title="Remove Child Profile"
                >
                  <Trash2 size={14} />
                  <span className="btn-text">Remove Child Profile</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildList;
