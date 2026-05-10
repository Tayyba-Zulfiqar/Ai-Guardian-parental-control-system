import { Bell } from 'lucide-react';
import './NotificationPreferences.css';

const NotificationPreferences = ({ notifications, onToggleMaster, onToggleOption }) => {
  return (
    <section className="account-section">
      <div className="section-header">
        <Bell size={20} className="section-icon" />
        <h2>Notification Preferences</h2>
      </div>
      <div className="card notifications-card">
        <div className="master-toggle-row">
          <div className="toggle-info">
            <h3>Enable Notifications</h3>
            <p>Receive alerts and summaries on your devices</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notifications.enabled} 
              onChange={onToggleMaster}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className={`notification-options ${!notifications.enabled ? 'disabled' : ''}`}>
          {!notifications.enabled && (
            <div className="disabled-overlay-text">
              <p>Turn on notifications to enable alerts</p>
            </div>
          )}
          
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={notifications.harmfulContentAlerts}
                disabled={!notifications.enabled}
                onChange={() => onToggleOption('harmfulContentAlerts')}
              />
              <span className="checkbox-custom"></span>
              <div className="checkbox-label-content">
                <span className="checkbox-title">Only harmful content alerts</span>
                <span className="checkbox-desc">Get notified immediately when we detect dangerous or inappropriate content.</span>
              </div>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={notifications.dailySummaryReports}
                disabled={!notifications.enabled}
                onChange={() => onToggleOption('dailySummaryReports')}
              />
              <span className="checkbox-custom"></span>
              <div className="checkbox-label-content">
                <span className="checkbox-title">Daily summary reports</span>
                <span className="checkbox-desc">Receive a daily digest of your child's online activity and screen time.</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationPreferences;
