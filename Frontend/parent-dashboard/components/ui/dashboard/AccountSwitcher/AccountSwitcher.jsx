import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { Users, Plus, ChevronDown } from 'lucide-react';
import { childrenData } from '../../../../data/Dashboard/childData';
import './AccountSwitcher.css';

const AccountSwitcher = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const switcherRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Temporary active child mock (first child in the list)
  const activeChild = childrenData[0];
  const otherChildren = childrenData.filter(child => child.id !== activeChild.id);

  const isLimitReached = childrenData.length >= 3;

  return (
    <div className="account-switcher-container" ref={switcherRef}>
      <button
        className={`avatar-trigger-btn ${isDropdownOpen ? 'active' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        data-tooltip={"Child Profile"}
      >
        <div className="trigger-avatar">{activeChild.avatar}</div>
        <span className="trigger-name">{activeChild.name}</span>
      </button>

      {isDropdownOpen && (
        <div className="account-dropdown-menu">
          <div className="dropdown-header">
            <div className="active-profile-large">
              <div className="large-avatar">{activeChild.avatar}</div>
              <div className="active-profile-info">
                <span className="profile-name">{activeChild.name}</span>
                <span className="profile-email">Active Protected Device</span>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-body">
            <p className="section-label">Switch Child</p>
            {otherChildren.length > 0 ? (
              otherChildren.map(child => (
                <div key={child.id} className="child-menu-item">
                  <div className="child-item-left">
                    <span className="item-avatar">{child.avatar}</span>
                    <span className="item-name">{child.name}</span>
                  </div>
                  <button className="item-switch-btn">Switch</button>
                </div>
              ))
            ) : (
              <p className="no-other-children">No other children linked</p>
            )}
          </div>

          <div className="dropdown-footer">
            <button
              className={`add-child-menu-btn ${isLimitReached ? 'disabled' : ''}`}
              disabled={isLimitReached}
              onClick={() => {
                if (!isLimitReached) {
                  navigate('/child-profile/1');
                  setIsDropdownOpen(false);
                }
              }}
            >
              {isLimitReached ? (
                <Users size={16} />
              ) : (
                <Plus size={16} />
              )}
              <span>{isLimitReached ? 'Limit reached (3/3 children)' : 'Add another child'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSwitcher;
