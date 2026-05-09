import { useState } from 'react';
import './AlertsFeed.css';
import AlertCard from '../AlertCard/AlertCard';
import EmptyAlertsState from '../EmptyAlertsState/EmptyAlertsState';
import { alertsFeedData } from '../../../../data/Alerts';

const AlertsFeed = () => {
  const [expandedAlertId, setExpandedAlertId] = useState(null);
  
  const todaysAlerts = alertsFeedData.filter(alert => !alert.timestamp.toLowerCase().includes('yesterday'));

  const handleToggle = (id) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  if (!todaysAlerts || todaysAlerts.length === 0) {
    return <EmptyAlertsState />;
  }

  return (
    <div className="alerts-feed-container">
      <div className="alerts-feed-list">
        {todaysAlerts.map((alert, index) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            isLast={index === todaysAlerts.length - 1}
            isExpanded={expandedAlertId === alert.id}
            onToggle={() => handleToggle(alert.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AlertsFeed;
