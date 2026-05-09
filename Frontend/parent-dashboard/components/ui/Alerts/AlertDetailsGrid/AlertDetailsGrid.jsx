import './AlertDetailsGrid.css';
import { Shield, Smartphone, AlertTriangle, Clock, Laptop, User, Activity } from 'lucide-react';

const AlertDetailsGrid = ({ alert }) => {
  return (
    <div className="alert-details-grid">
      <div className="detail-item">
        <div className="detail-label-wrapper">
          <Shield size={14} className="detail-icon" />
          <span className="detail-label">Type</span>
        </div>
        <span className="detail-value">{alert.type}</span>
      </div>
      <div className="detail-item">
        <div className="detail-label-wrapper">
          <Smartphone size={14} className="detail-icon" />
          <span className="detail-label">App Name</span>
        </div>
        <span className="detail-value">{alert.app}</span>
      </div>
      <div className="detail-item">
        <div className="detail-label-wrapper">
          <AlertTriangle size={14} className="detail-icon" />
          <span className="detail-label">Severity</span>
        </div>
        <span className="detail-value">{alert.severity}</span>
      </div>
      <div className="detail-item">
        <div className="detail-label-wrapper">
          <Clock size={14} className="detail-icon" />
          <span className="detail-label">Timestamp</span>
        </div>
        <span className="detail-value">{alert.timestamp}</span>
      </div>
      <div className="detail-item">
        <div className="detail-label-wrapper">
          <Laptop size={14} className="detail-icon" />
          <span className="detail-label">Device Name</span>
        </div>
        <span className="detail-value">{alert.device}</span>
      </div>
      <div className="detail-item">
        <div className="detail-label-wrapper">
          <User size={14} className="detail-icon" />
          <span className="detail-label">Child Name</span>
        </div>
        <span className="detail-value">{alert.child}</span>
      </div>
      <div className="detail-item full-width">
        <div className="detail-label-wrapper">
          <Activity size={14} className="detail-icon" />
          <span className="detail-label">AI Guardian Action</span>
        </div>
        <span className="detail-value action-value">{alert.summary}</span>
      </div>
    </div>
  );
};

export default AlertDetailsGrid;
