import './ContentReports.css';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import AccountSwitcher from '../../components/ui/dashboard/AccountSwitcher/AccountSwitcher';
import StatsCard from '../../components/common/StatsCard/StatsCard';
import ActivityInsights from '../../components/common/ActivityInsights/ActivityInsights';
import CommonPieChart from '../../components/charts/common/CommonPieChart';
import CommonAreaChart from '../../components/charts/common/CommonAreaChart';
import { contentReportsData } from '../../data/Content-Reports/contentReportsData';
import { ShieldAlert } from 'lucide-react';
import { useChild } from '../../context/ChildContext';

const ContentReports = () => {
  const { getActiveChild } = useChild();
  const activeChild = getActiveChild();
  
  const { threatTimeline, categoryAnalysis, riskScoreTrend, aiInsights } = contentReportsData;

  if (!activeChild) return null;
  const totalThreats = categoryAnalysis.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="content-reports-page">
      <div className="page-header-row">
        <PageHeader
          title="Content Reports"
          subtitle="Pattern Analysis & Threat Intelligence Dashboard"
        />
        <AccountSwitcher />
      </div>

      <section className="reports-section">
        <div className="section-title-wrapper">
          <ShieldAlert size={20} className="section-icon" />
          <h2 className="section-title">Threat Timeline Analysis</h2>
        </div>
        <div className="stats-grid">
          {threatTimeline.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              trend={stat.trend}
              Icon={ShieldAlert}
            />
          ))}
        </div>
      </section>

      <div className="charts-grid">
        <div className="chart-item">
          <CommonPieChart
            title="Content Category Analysis"
            subtitle="Threat classification distribution"
            data={categoryAnalysis}
            centerValue={totalThreats}
            centerLabel="Total Threats"
          />
        </div>
        <div className="chart-item">
          <CommonAreaChart
            title="Risk Score Trend"
            subtitle="Daily threat intensity variations"
            data={riskScoreTrend}
            yKey="score"
            color="#ef4444"
          />
        </div>
      </div>

      <section className="insights-section">
        <ActivityInsights 
          data={aiInsights} 
          childName={activeChild.name}
          gender={activeChild.gender}
        />
      </section>
    </div>
  );
};

export default ContentReports;