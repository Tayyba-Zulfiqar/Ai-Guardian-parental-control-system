
import './StatsCard.css';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatsCard = ({
  title,
  value,
  subtitle,
  trend,
  Icon
}) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <span className="stats-card-title">{title}</span>
        {Icon && (
          <div className="stats-card-icon-wrapper">
            <Icon size={20} className="stats-card-icon" />
          </div>
        )}
      </div>

      <div className="stats-card-body">
        <div className="stats-card-value">{value}</div>

        {subtitle && <span className="stats-card-subtitle">{subtitle}</span>}

        {trend && (
          <div className={`stats-card-trend ${trend.type || ''}`}>
            {trend.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span className="trend-value">{trend.value}</span>
            <span className="trend-text">{trend.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
