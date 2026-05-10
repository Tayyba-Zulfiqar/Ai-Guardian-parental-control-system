
import React from 'react';
import './ConfigurationLockedBanner.css';

const ConfigurationLockedBanner = () => {
  return (
    <div className="restricted-banner">
      <div className="lock-icon-box">
        <span role="img" aria-label="lock">🔒</span>
      </div>
      <div className="banner-text-content">
        <h3>Configuration Locked</h3>
        <p>Set a Security PIN above to enable monitoring and logout protection settings.</p>
      </div>
    </div>
  );
};

export default ConfigurationLockedBanner;
