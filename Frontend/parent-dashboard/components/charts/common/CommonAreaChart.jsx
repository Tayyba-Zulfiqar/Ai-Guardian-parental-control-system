
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './CommonCharts.css';

const CommonAreaChart = ({
  title,
  subtitle,
  data,
  xKey = "day",
  yKey = "value",
  color = "#8b5cf6",
  height = 300,
  yAxisFormatter = (value) => value
}) => {
  const gradientId = `color${yKey}`;

  return (
    <div className="common-chart-card">
      <div className="chart-header">
        {title && <h3>{title}</h3>}
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey={xKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
            />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommonAreaChart;
