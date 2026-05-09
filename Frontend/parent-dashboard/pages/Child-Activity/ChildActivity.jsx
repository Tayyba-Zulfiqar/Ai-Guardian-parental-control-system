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

import { childrenData } from '../../data/Dashboard/childrenData';

const ChildActivity = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const activeChild = childrenData[0];

  const currentChartData = appUsageDistribution[timeframe];
  const totalMinutes = currentChartData.reduce((acc, curr) => acc + curr.value, 0);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m > 0 ? `${m}m` : ''}`;
  };

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
          <div className="chart-wrapper-with-toggle">
            <div className="timeframe-toggle-container">
              {['daily', 'weekly', 'monthly'].map((tf) => (
                <button
                  key={tf}
                  className={`toggle-btn ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
            <CommonPieChart 
              title="App Usage Distribution"
              data={currentChartData}
              centerValue={formatTime(totalMinutes)}
              centerLabel="Total Used"
              innerRadius={80}
              outerRadius={110}
              height={350}
            />
          </div>
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