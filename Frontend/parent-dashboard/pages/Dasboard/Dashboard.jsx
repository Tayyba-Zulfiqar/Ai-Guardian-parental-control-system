import PageHeader from '../../components/common/PageHeader/PageHeader';
import ChildStatusCard from '../../components/ui/dashboard/ChildStatusCard/ChildStatusCard';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import TopApps from '../../components/ui/dashboard/TopApps/TopApps';
import ActivityInsights from '../../components/common/ActivityInsights/ActivityInsights';
import AccountSwitcher from '../../components/ui/dashboard/AccountSwitcher/AccountSwitcher'; // New Component
import { childrenData, parentData, dashboardInsightsData } from '../../data/Dashboard/childData';
import './Dashboard.css';

const Dashboard = () => {
  // Temporary active child mock (first child in the list)
  const activeChild = childrenData[0];

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
        <ChildStatusCard child={activeChild} />

        <div className="stats-section">
          <h2 className="dashboard-section-title">Today's Overview for {activeChild.name}:</h2>
          <div className="stats-overview-grid">
            {activeChild.stats.map((stat, index) => (
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
          <h2 className="dashboard-section-title">Top Apps Used Today:</h2>
          <TopApps child={activeChild} />
        </div>

        <div className="dashboard-insights-section">
           <ActivityInsights data={dashboardInsightsData} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;



//intelligence and summary page
/* 


STATUS OVERVIEW:
1- show total screen time 
2- risk level (high/med /low)
3- total alerts count (no lists)

BEHAVIOR INSIGHTS:
4- top apps used (only 3 top)
5- ai short summary of 3-4 lines


QUICK ACTIONS:
lock device / 


*/

