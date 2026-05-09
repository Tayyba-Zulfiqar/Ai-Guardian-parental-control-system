import './ChildActivity.css';
import { LayoutGrid, TrendingUp, Sparkles } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import AppsUsedToday from '../../components/ui/Child-Activity/AppsUsedToday/AppsUsedToday';
import AppUsageDistribution from '../../components/charts/AppUsageDistribution/AppUsageDistribution';
import ActivityInsights from '../../components/common/ActivityInsights/ActivityInsights';

import {
  childActivityStats,
  appsUsedToday,
  appUsageDistribution,
  aiInsightsData
} from '../../data/Child-Activity';

import { childrenData } from '../../data/Dashboard/childData';

const ChildActivity = () => {
  // Use the first child as active for now, consistent with Dashboard
  const activeChild = childrenData[0];

  return (
    <div className="child-activity-page">
      <PageHeader
        title="Child Activity"
        subtitle="Monitor app usage and digital behavior"
      />

      <div className="stats-section">
        <h2 className="dashboard-section-title">Activity Detail of {activeChild.name}:</h2>
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
          <h2 className="dashboard-section-title">All Apps Used Today:</h2>
          <AppsUsedToday data={appsUsedToday} />
        </div>

        <div className="activity-right-column">
          <AppUsageDistribution data={appUsageDistribution} />
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