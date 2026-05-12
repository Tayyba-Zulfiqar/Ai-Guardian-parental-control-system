import { useState } from 'react';

import './ScreenTime.css';

import {
  Clock,
  Calendar,
  CalendarDays
} from 'lucide-react';

import { useChild } from '../../context/ChildContext';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import CommonAreaChart from '../../components/charts/common/CommonAreaChart';

import {
  averageScreenTimeStats,
  screenTimeTrendData
} from '../../data/Screen-Time';

const ScreenTime = () => {
  const [chartView, setChartView] =
    useState('daily');

  const { getActiveChild } = useChild();

  const activeChild = getActiveChild();

  // Prevent crashes if no child exists
  if (!activeChild) {
    return null;
  }

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
                className={`toggle-btn ${chartView === 'daily'
                    ? 'active'
                    : ''
                  }`}
                onClick={() =>
                  setChartView('daily')
                }
              >
                Daily
              </button>

              <button
                className={`toggle-btn ${chartView === 'weekly'
                    ? 'active'
                    : ''
                  }`}
                onClick={() =>
                  setChartView('weekly')
                }
              >
                Weekly
              </button>

              <button
                className={`toggle-btn ${chartView === 'monthly'
                    ? 'active'
                    : ''
                  }`}
                onClick={() =>
                  setChartView('monthly')
                }
              >
                Monthly
              </button>

            </div>
          </div>

          <CommonAreaChart
            data={screenTimeTrendData[chartView]}
            xKey="day"
            yKey="time"
            color="#8b5cf6"
            yAxisFormatter={(value) =>
              `${Math.floor(value / 60)}h`
            }
          />

        </div>
      </div>
    </div>
  );
};

export default ScreenTime;