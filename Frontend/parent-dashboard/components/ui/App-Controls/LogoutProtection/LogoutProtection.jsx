
import { CheckCircle2, Lock, Unlock, AlertCircle, Clock, Settings } from 'lucide-react';

import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import './LogoutProtection.css';

const LogoutProtection = ({ 
  mode, 
  onModeChange, 
  pendingRequests,
  onApproveRequest,
  onDenyRequest
}) => {

  const modes = [
    {
      id: 'approval',
      title: 'Approval Mode',
      tag: 'Recommended',
      description: 'Child requests logout, parent approves or denies from dashboard.',
      icon: CheckCircle2,
      color: 'blue'
    },
    {
      id: 'pin',
      title: 'PIN Mode',
      tag: 'Strict',
      description: 'Child must enter parent PIN directly on device to logout.',
      icon: Lock,
      color: 'purple'
    },
    {
      id: 'disabled',
      title: 'Disabled',
      tag: 'Not Recommended',
      description: 'Child can logout freely without any restrictions.',
      icon: Unlock,
      color: 'gray'
    }
  ];

  return (
    <div className="logout-protection-section">
      <div className="mode-cards-grid">

        {modes.map((m) => {
          const Icon = m.icon;
          const isSelected = mode === m.id;
          return (
            <div 
              key={m.id} 
              className={`mode-card ${isSelected ? 'selected' : ''} ${m.color}`}
              onClick={() => onModeChange(m.id)}
            >
              <div className="mode-card-header">
                <div className="mode-icon-wrapper">
                  <Icon size={20} />
                </div>
                {m.tag && <span className="mode-tag">{m.tag}</span>}
              </div>
              <h4 className="mode-title">{m.title}</h4>
              <p className="mode-description">{m.description}</p>
              <div className="selection-indicator">
                <div className="radio-circle"></div>
              </div>
            </div>
          );
        })}
      </div>

      <Card className="mode-selection-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2 className="dashboard-section-title">
              <Settings size={20} />
              {modes.find(m => m.id === mode)?.title} Details & Actions
            </h2>
            <p className="mode-details-subtitle">Configure specific rules for your selected protection mode below.</p>
          </div>
          <div className="active-mode-badge">
            Currently Configuring
          </div>
        </div>
      </Card>

      <div className="mode-details-container">

        {mode === 'approval' && (
          <div className="approval-details">
            <h4 className="details-title">
              <Clock size={18} />
              Pending Logout Requests
            </h4>
            {pendingRequests.length > 0 ? (
              <div className="requests-list">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="request-item">
                    <div className="request-info">
                      <span className="child-name">{req.childName}</span>
                      <span className="device-name">{req.deviceName}</span>
                      <span className="request-time">{req.time}</span>
                    </div>
                    <div className="request-actions">
                      <Button variant="danger" size="small" onClick={() => onDenyRequest(req.id)}>Deny</Button>
                      <Button variant="primary" size="small" onClick={() => onApproveRequest(req.id)}>Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-requests">No pending logout requests.</p>
            )}
          </div>
        )}

        {mode === 'pin' && (
          <div className="pin-details-warning">
            <Lock size={20} />
            <div>
              <h4 className="details-title">Security PIN Required</h4>
              <p>Your child must enter the parent PIN directly on their device to log out. Ensure they do not know this PIN.</p>
            </div>
          </div>
        )}

        {mode === 'disabled' && (
          <div className="disabled-warning">
            <AlertCircle size={20} />
            <div>
              <h4 className="details-title">Warning: Protection Disabled</h4>
              <p>Your child can stop monitoring by logging out at any time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutProtection;
