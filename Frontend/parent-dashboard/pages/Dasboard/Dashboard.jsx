import DashboardHeader from '../../components/ui/dashboard/DashboardHeader/DashboardHeader';
import ChildStatusCard from '../../components/ui/dashboard/ChildStatusCard/ChildStatusCard';
import { childData } from '../../data/childData';
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

