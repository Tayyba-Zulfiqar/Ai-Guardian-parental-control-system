import { useState } from 'react';
import './AppUsageDistribution.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AppUsageDistribution = ({ data }) => {
  const [timeframe, setTimeframe] = useState('daily');

  const chartData = data[timeframe];
  
  const totalScreenTime = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const formatTooltip = (value) => {
    return [`${value}%`, 'Usage'];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-usage-distribution">
      <div className="distribution-header">
        <h3>App Usage Distribution</h3>
        <div className="timeframe-toggle">
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
      </div>

      <div className="distribution-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="chart-center-text">
          <span className="center-value">{totalScreenTime}%</span>
          <span className="center-label">Total Used</span>
        </div>
      </div>
    </div>
  );
};

export default AppUsageDistribution;
