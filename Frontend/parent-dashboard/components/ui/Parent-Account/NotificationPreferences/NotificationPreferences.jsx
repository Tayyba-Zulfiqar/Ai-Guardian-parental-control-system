import { Bell, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toggle from '../../../common/Toggle/Toggle';
import './NotificationPreferences.css';

const NotificationPreferences = ({ notifications, onToggleMaster, onToggleOption }) => {
  // Check if at least one option is selected
  const activeOptionsCount = [notifications.harmfulContentAlerts, notifications.dailySummaryReports].filter(Boolean).length;

  const handleOptionChange = (key) => {
    if (notifications[key] && activeOptionsCount === 1) {
      // If trying to uncheck the last active option, we could show a message or prevent it
      // For now, let's just prevent it as per the "at least one" requirement
      return;
    }
    onToggleOption(key);
  };

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
          <Toggle 
            checked={notifications.enabled} 
            onChange={onToggleMaster}
          />
        </div>

        <div className={`notification-options ${!notifications.enabled ? 'disabled' : ''}`}>
          <AnimatePresence>
            {!notifications.enabled && (
              <motion.div 
                className="disabled-overlay-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>Turn on notifications to enable alerts</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="options-group">
            <div className={`option-item ${!notifications.enabled ? 'item-disabled' : ''}`}>
              <div className="option-label-content">
                <span className="option-title">Only harmful content alerts</span>
                <span className="option-desc">Get notified immediately when we detect dangerous or inappropriate content.</span>
              </div>
              <Toggle 
                size="small"
                checked={notifications.harmfulContentAlerts}
                disabled={!notifications.enabled}
                onChange={() => handleOptionChange('harmfulContentAlerts')}
              />
            </div>

            <div className={`option-item ${!notifications.enabled ? 'item-disabled' : ''}`}>
              <div className="option-label-content">
                <span className="option-title">Daily summary reports</span>
                <span className="option-desc">Receive a daily digest of your child's online activity and screen time.</span>
              </div>
              <Toggle 
                size="small"
                checked={notifications.dailySummaryReports}
                disabled={!notifications.enabled}
                onChange={() => handleOptionChange('dailySummaryReports')}
              />
            </div>
          </div>

          <AnimatePresence>
            {notifications.enabled && activeOptionsCount === 1 && (
              <motion.div 
                className="at-least-one-hint"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AlertCircle size={14} />
                <span>At least one notification type must remain active.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};


export default NotificationPreferences;
