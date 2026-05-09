import { useState } from 'react';
import './ScreenTime.css';
import { Clock, Calendar, CalendarDays } from 'lucide-react';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import WeeklyActivityTrend from '../../components/charts/WeeklyActivityTrend/WeeklyActivityTrend';

import {
  averageScreenTimeStats,
  screenTimeTrendData
} from '../../data/Screen-Time';

import { childrenData } from '../../data/Dashboard/childrenData';

const ScreenTime = () => {
  const [chartView, setChartView] = useState('daily');

  // Use the first child as active for now
  const activeChild = childrenData[0];

  return (
    <div className="screen-time-page">

      <PageHeader
        title="Screen Time"
        subtitle="Monitor and analyze daily screen time habits"
      />

      <div className="stats-section">
        <h2 className="dashboard-section-title">
          Average Screen Time for {activeChild.name}:
        </h2>

        <div className="screen-time-stats-row">

          <StatsCard
            title={averageScreenTimeStats.daily.title}
            value={averageScreenTimeStats.daily.value}
            Icon={Clock}
            trend={averageScreenTimeStats.daily.trend}
          />

          <StatsCard
            title={averageScreenTimeStats.weekly.title}
            value={averageScreenTimeStats.weekly.value}
            Icon={Calendar}
            trend={averageScreenTimeStats.weekly.trend}
          />

          <StatsCard
            title={averageScreenTimeStats.monthly.title}
            value={averageScreenTimeStats.monthly.value}
            Icon={CalendarDays}
            trend={averageScreenTimeStats.monthly.trend}
          />

        </div>
      </div>

      <div className="screen-time-content">

        <div className="screen-time-trend-section">

          <div className="screen-time-trend-header">

            <h2 className="dashboard-section-title">
              Screen Time Trend:
            </h2>

            <div className="trend-view-toggle">

              <button
                className={`toggle-btn ${chartView === 'daily' ? 'active' : ''}`}
                onClick={() => setChartView('daily')}
              >
                Daily
              </button>

              <button
                className={`toggle-btn ${chartView === 'weekly' ? 'active' : ''}`}
                onClick={() => setChartView('weekly')}
              >
                Weekly
              </button>

              <button
                className={`toggle-btn ${chartView === 'monthly' ? 'active' : ''}`}
                onClick={() => setChartView('monthly')}
              >
                Monthly
              </button>

            </div>
          </div>

          <WeeklyActivityTrend
            data={screenTimeTrendData[chartView]}
            view={chartView}
          />

        </div>
      </div>
    </div>
  );
};

export default ScreenTime;