
import React from 'react';
import './ControlSection.css';

const ControlSection = ({ title, children, className = "" }) => {
  return (
    <div className={`control-section ${className}`}>
      {title && <h2 className="dashboard-section-title">{title}</h2>}
      {children}
    </div>
  );
};

export default ControlSection;
