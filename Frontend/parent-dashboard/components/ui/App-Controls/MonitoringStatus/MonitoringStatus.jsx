
import { Shield, AlertTriangle } from 'lucide-react';
import Card from '../../../common/Card/Card';
import Toggle from '../../../common/Toggle/Toggle';
import './MonitoringStatus.css';

const MonitoringStatus = ({ isActive, onToggle }) => {
  return (
    <Card className="monitoring-card">
      <div className="monitoring-header">
        <div className="monitoring-info">
          <div className="status-badge-container">
            <Shield size={24} className={isActive ? "icon-active" : "icon-paused"} />
            <div className="status-text-group">
              <div className="status-indicator">
                <span className={`status-dot ${isActive ? 'active' : 'paused'}`}></span>
                <span className="status-text">{isActive ? 'Active' : 'Paused'}</span>
              </div>
            </div>

          </div>
          <p className="section-description">
            When active, AI-Guardian monitors app usage, web activity, and screen time on all connected devices.
          </p>
        </div>
        <div className="monitoring-action">
          <Toggle checked={isActive} onChange={onToggle} />
        </div>
      </div>
      
      {!isActive && (
        <div className="warning-banner">
          <AlertTriangle size={18} />
          <span>Monitoring is currently disabled. Devices are not being tracked.</span>
        </div>
      )}
    </Card>
  );
};

export default MonitoringStatus;
