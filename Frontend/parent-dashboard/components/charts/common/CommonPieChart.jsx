
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './CommonCharts.css';

const CommonPieChart = ({ 
  title, 
  subtitle, 
  data, 
  dataKey = "value", 
  nameKey = "name",
  innerRadius = 60,
  outerRadius = 80,
  height = 300,
  showLegend = true,
  centerLabel,
  centerValue
}) => {
  return (
    <div className="common-chart-card">
      <div className="chart-header">
        {title && <h3>{title}</h3>}
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>
      
      <div className="chart-container pie-container">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey={dataKey}
              nameKey={nameKey}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || entry.fill || "#8b5cf6"} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
            />
            {showLegend && (
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        {(centerValue || centerLabel) && (
          <div className="chart-center-text">
            {centerValue && <span className="center-value">{centerValue}</span>}
            {centerLabel && <span className="center-label">{centerLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonPieChart;
