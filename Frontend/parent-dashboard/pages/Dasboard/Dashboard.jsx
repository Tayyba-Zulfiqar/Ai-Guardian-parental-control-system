import DashboardHeader from '../../components/ui/dashboard/DashboardHeader/DashboardHeader';
import ChildStatusCard from '../../components/ui/dashboard/ChildStatusCard/ChildStatusCard';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import TopApps from '../../components/ui/dashboard/TopApps/TopApps';
import AISummary from '../../components/ui/dashboard/AISummary/AISummary';
import { childData } from '../../data/Dashboard/childData';
import { statsData } from '../../data/Dashboard/statsData';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <DashboardHeader
        parentName={childData.parentName}
        childName={childData.name}
      />

      <section className="dashboard-content">
        <ChildStatusCard
          name={childData.name}
          age={childData.age}
          status={childData.status}
          lastSeen={childData.lastSeen}
        />

        <div className="stats-section">
          <h2 className="dashboard-section-title">Today's Overview:</h2>
          <div className="stats-overview-grid">
            {statsData.map((stat, index) => (
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
          <TopApps />
        </div>

        <AISummary />
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

