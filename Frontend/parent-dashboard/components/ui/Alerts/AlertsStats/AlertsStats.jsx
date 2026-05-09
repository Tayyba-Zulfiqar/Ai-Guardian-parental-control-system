import './AlertsStats.css';
import StatsCard from '../../../common/StatsCard/StatsCard';
import { alertsStatsData } from '../../../../data/Alerts';

const AlertsStats = () => {
  return (
    <div className="alerts-stats-grid">
      {alertsStatsData.map((stat) => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          Icon={stat.Icon}
        />
      ))}
    </div>
  );
};

export default AlertsStats;
