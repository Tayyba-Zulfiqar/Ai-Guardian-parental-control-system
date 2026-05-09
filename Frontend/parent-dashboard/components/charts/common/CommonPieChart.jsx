
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './CommonCharts.css';

const CommonPieChart = ({
  title,
  subtitle,
  data, // Can be an array or an object with timeframe keys
  dataKey = "value",
  nameKey = "name",
  innerRadius = 80,
  outerRadius = 110,
  height = 350,
  showLegend = true,
  centerLabel,
  centerValue,
  valueFormatter = (val) => val,
  // Timeframe props
  timeframe,
  setTimeframe,
  timeframes = ['daily', 'weekly', 'monthly'],
  showToggle = false
}) => {
  // Handle both direct data array and timeframe-based data object
  const chartData = (showToggle && data[timeframe]) ? data[timeframe] : data;
  
  // Calculate total if needed
  const totalValue = Array.isArray(chartData) 
    ? chartData.reduce((acc, curr) => acc + (curr[dataKey] || 0), 0)
    : 0;

  const displayValue = centerValue !== undefined ? centerValue : valueFormatter(totalValue);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <motion.div
        className="custom-tooltip"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="tooltip-content">
          <div
            className="tooltip-indicator"
            style={{ backgroundColor: payload[0].payload.fill || payload[0].color }}
          ></div>
          <div className="tooltip-info">
            <p className="tooltip-label">{payload[0].name}</p>
            <div className="tooltip-stats">
              <span className="tooltip-value">{valueFormatter(payload[0].value)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="common-chart-card">
      <div className="chart-header">
        <div className="header-text">
          {title && <h3>{title}</h3>}
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        
        {showToggle && setTimeframe && (
          <div className="timeframe-toggle">
            {timeframes.map((tf) => (
              <button
                key={tf}
                className={`toggle-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="chart-container pie-container">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey={dataKey}
              nameKey={nameKey}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || entry.fill || "#8b5cf6"} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              isAnimationActive={false}
              wrapperStyle={{
                outline: 'none',
                zIndex: 9999,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                pointerEvents: 'none'
              }}
            />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: '30px'
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        {(displayValue || centerLabel) && (
          <div className="chart-center-text">
            {displayValue && <span className="center-value">{displayValue}</span>}
            {centerLabel && <span className="center-label">{centerLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonPieChart;
