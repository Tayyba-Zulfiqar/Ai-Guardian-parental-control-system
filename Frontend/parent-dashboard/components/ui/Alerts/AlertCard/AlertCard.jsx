
import './AlertCard.css';
import { AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { AlertDetailsGrid, AlertAISummary, AlertEvidenceCard } from '../index';

const getSeverityStyles = (severity) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return { badgeClass: 'badge-critical', icon: XCircle, color: '#ef4444' };
    case 'high':
    case 'warning':
      return { badgeClass: 'badge-warning', icon: AlertTriangle, color: '#f59e0b' };
    case 'medium':
      return { badgeClass: 'badge-warning', icon: AlertTriangle, color: '#f59e0b' };
    case 'low':
    case 'safe':
      return { badgeClass: 'badge-safe', icon: CheckCircle, color: '#22c55e' };
    default:
      return { badgeClass: 'badge-info', icon: Info, color: '#3b82f6' };
  }
};

const AlertCard = ({ alert, isLast, isExpanded, onToggle }) => {
  const { badgeClass, icon: SeverityIcon, color } = getSeverityStyles(alert.severity);

  // Generate a title based on the alert
  const title = alert.details || `${alert.type} detected on ${alert.app}`;

  return (
    <div className={`alert-row-wrapper ${!isLast ? 'has-border' : ''}`}>
      <div
        className="alert-row-header"
        onClick={onToggle}
      >
        <div className="alert-row-left">
          <div className="alert-icon-wrapper" style={{ color: color }}>
            <SeverityIcon size={20} />
          </div>
          <div className="alert-info">
            <h4 className="alert-title">{title}</h4>
            <div className="alert-meta">
              <span className="alert-timestamp">{alert.timestamp}</span>
              <span className="alert-dot">·</span>
              <span className="alert-app">{alert.app}</span>
            </div>
          </div>
        </div>

        <div className="alert-row-right">
          <div className={`severity-badge ${badgeClass}`}>
            {alert.severity.toLowerCase()}
          </div>
          <button className="expand-btn">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="alert-expanded-content">
          <div className="expanded-top-section">
            <div className="expanded-info-column">
              <AlertDetailsGrid alert={alert} />
              {alert.aiSummary && <AlertAISummary summary={alert.aiSummary} />}
            </div>
            <div className="expanded-evidence-column">
              <AlertEvidenceCard state={alert.evidenceState || 'none'} />
            </div>
          </div>


        </div>
      )}
    </div>
  );
};

export default AlertCard;
