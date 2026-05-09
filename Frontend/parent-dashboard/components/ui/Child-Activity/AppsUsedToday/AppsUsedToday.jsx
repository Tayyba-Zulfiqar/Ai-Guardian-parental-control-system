import './AppsUsedToday.css';
import { PlaySquare, Gamepad2, Globe, MessageCircle, Book, Camera } from 'lucide-react';

const iconMap = {
  youtube: <PlaySquare size={20} />,
  gamepad: <Gamepad2 size={20} />,
  globe: <Globe size={20} />,
  message: <MessageCircle size={20} />,
  book: <Book size={20} />,
  camera: <Camera size={20} />
};

const AppsUsedToday = ({ data }) => {
  return (
    <div className="apps-used-today">
      <div className="apps-today-header">
        <h3>Apps Used Today</h3>
      </div>
      <div className="apps-today-grid">
        {data.map((app) => (
          <div key={app.id} className="app-today-card">
            <div className="app-today-top">
              <div className={`app-icon-wrapper ${app.iconType}`}>
                {iconMap[app.iconType] || <Globe size={20} />}
              </div>
              <div className={`app-status ${app.status}`}></div>
            </div>
            
            <div className="app-today-info">
              <h4 className="app-name">{app.name}</h4>
              <span className="app-category-badge">{app.category}</span>
            </div>
            
            <div className="app-today-stats">
              <div className="stat-item">
                <span className="stat-label">Time Spent</span>
                <span className="stat-value">{app.timeSpent}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Opened</span>
                <span className="stat-value">{app.lastOpened}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppsUsedToday;
