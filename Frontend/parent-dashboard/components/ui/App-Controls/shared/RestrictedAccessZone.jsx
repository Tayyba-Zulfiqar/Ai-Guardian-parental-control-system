
import React from 'react';
import './RestrictedAccessZone.css';

const RestrictedAccessZone = ({ isLocked, onLockedClick, children }) => {
  return (
    <div 
      className={`restricted-access-zone ${isLocked ? 'is-disabled' : ''}`}
      onClick={() => {
        if (isLocked && onLockedClick) {
          onLockedClick();
        }
      }}
    >
      {children}
    </div>
  );
};

export default RestrictedAccessZone;
