import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useChild } from '../../context/ChildContext';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import ChildStatusCard from '../../components/ui/dashboard/ChildStatusCard/ChildStatusCard';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import TopApps from '../../components/ui/dashboard/TopApps/TopApps';
import ActivityInsights from '../../components/common/ActivityInsights/ActivityInsights';
import AccountSwitcher from '../../components/ui/dashboard/AccountSwitcher/AccountSwitcher';

import {
  childrenData,
  parentData,
  dashboardInsightsData
} from '../../data/Dashboard';

import './Dashboard.css';

const Dashboard = () => {
  const {
    childrenList,
    getActiveChild,
    isLoading,
  } = useChild();

  const navigate = useNavigate();

  // Redirect if no child connected (skip if loading)
  useEffect(() => {
    if (isLoading) return;

    if (childrenList.length === 0) {
      navigate('/connect-child', {
        replace: true,
      });
    }
  }, [childrenList, navigate, isLoading]);

  // Active child from context
  const activeChild = getActiveChild();

  // Prevent crash while redirecting
  if (!activeChild) {
    return null;
  }

  // Temporary dummy UI data
  // (frontend phase only)
  const activeChildMockData = childrenData[0];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-row">
        <PageHeader
          title={`Welcome Back, ${parentData.name}`}
          subtitle={`Here's what's happening in your family today`}
        />

        <AccountSwitcher />
      </div>

      <section className="dashboard-content">

        {/* REAL selected child identity */}
        <ChildStatusCard
          child={{
            ...activeChildMockData,
            name: activeChild.name,
            deviceType: activeChild.deviceType,
            status: 'Currently Active',
          }}
        />

        <div className="stats-section">
          <h2 className="dashboard-section-title">
            Today's Overview for {activeChild.name}:
          </h2>

          <div className="stats-overview-grid">
            {activeChildMockData.stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                trend={stat.trend}
                Icon={stat.Icon}
              />
            ))}
          </div>
        </div>

        <div className="stats-section">
          <h2 className="dashboard-section-title">
            Top Apps Used Today:
          </h2>

          <TopApps
            child={{
              ...activeChildMockData,
              name: activeChild.name,
              deviceType: activeChild.deviceType,
            }}
          />
        </div>

        <div className="dashboard-insights-section">
          <ActivityInsights
            data={dashboardInsightsData}
          />
        </div>

      </section>
    </div>
  );
};

export default Dashboard;