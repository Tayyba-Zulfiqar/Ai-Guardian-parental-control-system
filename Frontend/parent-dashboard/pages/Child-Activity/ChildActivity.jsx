import { useState } from 'react';
import './ChildActivity.css';
import { LayoutGrid, TrendingUp, Sparkles } from 'lucide-react';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import AppsUsedToday from '../../components/ui/Child-Activity/AppsUsedToday/AppsUsedToday';
import CommonPieChart from '../../components/charts/common/CommonPieChart';
import ActivityInsights from '../../components/common/ActivityInsights/ActivityInsights';

import {
  childActivityStats,
  appsUsedToday,
  appUsageDistribution,
  aiInsightsData
} from '../../data/Child-Activity';

import { useChild } from '../../context/ChildContext';

const ChildActivity = () => {
  const [timeframe, setTimeframe] = useState('daily');

  const { getActiveChild } = useChild();
  const activeChild = getActiveChild();

  if (!activeChild) return null;

  return (
    <div className="child-activity-page">
      <PageHeader
        title="Child Activity"
        subtitle="Monitor app usage and digital behavior"
      />

      <div className="stats-section">
        <h2 className="dashboard-section-title">
          Activity Detail of {activeChild.name}:
        </h2>

        <div className="activity-stats-row">
          <StatsCard
            title="Total Apps Used Today"
            value={childActivityStats.totalAppsToday.value}
            Icon={LayoutGrid}
            trend={childActivityStats.totalAppsToday.trend}
          />

          <StatsCard
            title="Most Used App Today"
            value={childActivityStats.mostUsedAppToday.value}
            Icon={Sparkles}
            trend={childActivityStats.mostUsedAppToday.trend}
          />

          <StatsCard
            title="Most Used Category"
            value={childActivityStats.mostUsedCategoryToday.value}
            Icon={TrendingUp}
            subtitle={childActivityStats.mostUsedCategoryToday.subtitle}
          />
        </div>
      </div>

      <div className="activity-main-grid">
        <div className="activity-left-column">
          <h2 className="dashboard-section-title">
            All Apps Used Today:
          </h2>

          <AppsUsedToday data={appsUsedToday} />
        </div>

        <div className="activity-right-column">
          <CommonPieChart
            title="App Usage Distribution"
            subtitle="Time spent per category"
            data={appUsageDistribution}
            showToggle={true}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            centerLabel="Total Used"
            valueFormatter={(mins) => {
              const h = Math.floor(mins / 60);
              const m = mins % 60;
              if (h === 0) return `${m}m`;
              return `${h}h ${m > 0 ? `${m}m` : ''}`;
            }}
          />
        </div>
      </div>

      <div className="activity-secondary-grid">
        <div className="activity-insights-container">
          <ActivityInsights data={aiInsightsData} />
        </div>
      </div>
    </div>
  );
};

export default ChildActivity;