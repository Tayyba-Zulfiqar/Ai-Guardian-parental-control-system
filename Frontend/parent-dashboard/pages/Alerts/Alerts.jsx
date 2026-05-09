import './Alerts.css';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import { AlertsStats, AlertsFeed } from '../../components/ui/Alerts';
import { childrenData } from '../../data/Dashboard';

const Alerts = () => {
  const activeChild = childrenData[0];

  return (
    <div className="alerts-page">
      <PageHeader 
        title="Alerts" 
        subtitle="Live harmful activity monitoring and security events"
      />
      
      <div className="alerts-page-content">
        <AlertsStats />
        
        <div className="alerts-section-header">
          <h2>Today's Alerts from {activeChild.name}'s Phone:</h2>
          <span className="alerts-count-badge">Showing latest events</span>
        </div>
        
        <AlertsFeed />
      </div>
    </div>
  );
};

export default Alerts;