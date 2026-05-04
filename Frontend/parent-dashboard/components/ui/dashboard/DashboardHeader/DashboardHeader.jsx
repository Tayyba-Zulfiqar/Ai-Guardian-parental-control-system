
import './DashboardHeader.css';

const DashboardHeader = ({ parentName = 'Parent', childName = 'Sarah' }) => {
  return (
    <div className="dashboard-header">
      <h1 className="welcome-title">Welcome Back, {parentName}</h1>
      <p className="welcome-subtitle">Here's what's happening with {childName}'s device</p>
    </div>
  );
};

export default DashboardHeader;
