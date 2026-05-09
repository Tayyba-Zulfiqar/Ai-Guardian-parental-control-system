import './EmptyAlertsState.css';
import { ShieldCheck } from 'lucide-react';

const EmptyAlertsState = () => {
  return (
    <div className="empty-alerts-state">
      <div className="empty-icon-wrapper">
        <ShieldCheck size={48} className="empty-icon" />
      </div>
      <h3 className="empty-title">All Clear!</h3>
      <p className="empty-subtitle">
        No harmful events detected. AI Guardian is actively monitoring your child's activity.
      </p>
    </div>
  );
};

export default EmptyAlertsState;
