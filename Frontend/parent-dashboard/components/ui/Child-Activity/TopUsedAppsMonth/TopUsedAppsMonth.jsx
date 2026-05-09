import './TopUsedAppsMonth.css';
import { PlaySquare, Gamepad2, Video, Globe, MessageCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const iconMap = {
  youtube: <PlaySquare size={20} />,
  gamepad: <Gamepad2 size={20} />,
  video: <Video size={20} />,
  globe: <Globe size={20} />,
  message: <MessageCircle size={20} />
};

const TopUsedAppsMonth = ({ data }) => {
  return (
    <div className="top-used-apps-month">
      <div className="top-used-apps-header">
        <h3>Top Used Apps This Month</h3>
      </div>
      <div className="top-used-apps-list">
        {data.map((app) => (
          <div key={app.id} className="app-list-card">
            <div className="app-info-section">
              <div className={`app-icon-wrapper ${app.iconType}`}>
                {iconMap[app.iconType] || <Globe size={20} />}
              </div>
              <div className="app-details">
                <span className="app-name">{app.name}</span>
                <span className="app-category">{app.category}</span>
              </div>
            </div>
            
            <div className="app-stats-section">
              <div className="app-usage-time">
                <span className="avg-time">{app.avgTime}</span>
                <span className="avg-label">/ day</span>
              </div>
              
              <div className="app-progress-container">
                <div className="app-progress-bar">
                  <div 
                    className="app-progress-fill" 
                    style={{ width: `${app.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className={`app-trend ${app.trend.startsWith('+') ? 'increase' : 'decrease'}`}>
                {app.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{app.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsedAppsMonth;
