import './TopApps.css';
import { topAppsData } from '../../../../data/topAppsData';

const TopApps = () => {
  return (
    <div className="top-apps-container">
      <div className="top-apps-list-section">
        <h3 className="section-title">Top Apps Used Today</h3>

        <div className="apps-list">
          {topAppsData.map((app) => (
            <div key={app.id} className="app-item">
              <div className="app-info-left">
                <div className="app-icon-wrapper" style={{ backgroundColor: `${app.color}10` }}>
                  <app.Icon size={20} style={{ color: app.color }} />
                </div>
                <div className="app-details">
                  <span className="app-name">{app.name}</span>
                  <span className="app-category">{app.category}</span>
                </div>
              </div>

              <div className="app-usage-right">
                <span className="usage-time">{app.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopApps;
