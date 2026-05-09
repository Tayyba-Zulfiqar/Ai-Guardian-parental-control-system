import './ActivityInsights.css';
import { Sparkles, TrendingUp, AlertTriangle, Info } from 'lucide-react';

const iconMap = {
  warning: <TrendingUp size={20} className="insight-icon warning-icon" />,
  alert: <AlertTriangle size={20} className="insight-icon alert-icon" />,
  info: <Info size={20} className="insight-icon info-icon" />
};

const ActivityInsights = ({ data }) => {
  return (
    <div className="activity-insights">
      <div className="insights-header">
        <div className="insights-title-wrapper">
          <Sparkles size={20} className="sparkles-icon" />
          <h3>AI Insights</h3>
        </div>
      </div>
      
      <div className="insights-list">
        {data.map((item) => (
          <div key={item.id} className={`insight-card ${item.type}`}>
            <div className="insight-icon-wrapper">
              {iconMap[item.type]}
            </div>
            <p className="insight-text">{item.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityInsights;
