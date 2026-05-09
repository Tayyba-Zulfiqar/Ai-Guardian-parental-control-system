import './ChildActivity.css';
import { LayoutGrid, TrendingUp, Sparkles } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import StatsCard from '../../components/common/StatsCard/StatsCard';

import TopUsedAppsMonth from '../../components/ui/Child-Activity/TopUsedAppsMonth/TopUsedAppsMonth';
import AppsUsedToday from '../../components/ui/Child-Activity/AppsUsedToday/AppsUsedToday';
import AppUsageDistribution from '../../components/ui/Child-Activity/AppUsageDistribution/AppUsageDistribution';
import WeeklyActivityTrend from '../../components/ui/Child-Activity/WeeklyActivityTrend/WeeklyActivityTrend';
import ActivityInsights from '../../components/ui/Child-Activity/ActivityInsights/ActivityInsights';

import {
  childActivityStats,
  topUsedAppsMonth,
  appsUsedToday,
  appUsageDistribution,
  weeklyActivityTrend,
  aiInsightsData
} from '../../data/Child-Activity/childActivityData';

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
            value={childActivityStats.totalAppsToday}
            Icon={LayoutGrid}
            trend={{ type: 'success', direction: 'up', value: '2', text: 'vs yesterday' }}
          />
          <StatsCard
            title="Most Used App Today"
            value={childActivityStats.mostUsedAppToday}
            Icon={Sparkles}
            trend={{ type: 'warning', direction: 'up', value: '15m', text: 'more today' }}
          />
          <StatsCard
            title="Most Used Category"
            value={childActivityStats.mostUsedCategoryToday}
            Icon={TrendingUp}
            subtitle="Highest Activity "
          />
        </div>
      </div>

      <div className="activity-main-grid">
        <div className="activity-left-column">
          <AppsUsedToday data={appsUsedToday} />
        </div>

        <div className="activity-right-column">
          <AppUsageDistribution data={appUsageDistribution} />
        </div>
      </div>

      <div className="activity-secondary-grid">
        <div className="activity-trend-container">
          <WeeklyActivityTrend data={weeklyActivityTrend} />
        </div>

        <div className="activity-apps-container">
          <TopUsedAppsMonth data={topUsedAppsMonth} />
        </div>

        <div className="activity-insights-container">
          <ActivityInsights data={aiInsightsData} />
        </div>
      </div>
    </div>
  );
};

export default ChildActivity;




// child activity monitoring

/* 
1- most frequently used apps name monthly(top 5 with average time)
2- all apps used today name.
3. APP USAGE DISTRIBUTION (Chart View) --> pie chart (monthly/weekly/daily)
*/