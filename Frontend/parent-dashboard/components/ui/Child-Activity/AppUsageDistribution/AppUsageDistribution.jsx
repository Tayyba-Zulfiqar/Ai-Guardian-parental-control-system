import { useState } from 'react';
import { motion } from 'framer-motion';
import './AppUsageDistribution.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AppUsageDistribution = ({ data }) => {
  const [timeframe, setTimeframe] = useState('daily');

  const chartData = data[timeframe];
  
  const totalMinutes = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m > 0 ? `${m}m` : ''}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    return (
      <motion.div 
        className="custom-tooltip"
        initial={false}
        animate={{ 
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.9,
          y: active ? 0 : 10
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          opacity: { duration: 0.2 }
        }}
      >
        {payload && payload.length > 0 && (
          <div className="tooltip-content">
            <div 
              className="tooltip-indicator" 
              style={{ backgroundColor: payload[0].payload.fill }}
            ></div>
            <div className="tooltip-info">
              <p className="tooltip-label">{payload[0].name}</p>
              <div className="tooltip-stats">
                <span className="tooltip-value">{formatTime(payload[0].value)}</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
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
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
              isAnimationActive={true}
              animationDuration={400}
              animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
              wrapperStyle={{ 
                outline: 'none',
                zIndex: 1000,
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              iconType="circle"
              wrapperStyle={{ 
                fontSize: '12px', 
                color: '#64748b', 
                paddingTop: '30px' 
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="chart-center-text">
          <span className="center-value">{formatTime(totalMinutes)}</span>
          <span className="center-label">Total Used</span>
        </div>
      </div>
    </div>
  );
};

export default AppUsageDistribution;
