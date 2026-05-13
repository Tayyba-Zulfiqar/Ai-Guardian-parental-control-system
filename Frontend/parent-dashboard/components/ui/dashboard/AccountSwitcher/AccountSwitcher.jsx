import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { Users, Plus } from 'lucide-react';
import { childrenData } from '../../../../data/Dashboard/childrenData';
import { useChild } from '../../../../context/ChildContext';
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

  const { childrenList, getActiveChild, requestSwitchChild } = useChild();

  const activeChildContext = getActiveChild();

  if (!activeChildContext) return null;

  const activeChild = {
    id: activeChildContext.id,
    name: activeChildContext.name,
    avatar: activeChildContext.profile?.avatar || '👦'
  };

  const otherChildren = childrenList
    .filter(child => child.id !== activeChild.id)
    .map(child => ({
      id: child.id,
      name: child.name,
      avatar: child.profile?.avatar || '👦'
    }));

  const isLimitReached = childrenList.length >= 3;

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
            <div 
              className="active-profile-large" 
              onClick={() => {
                navigate(`/family-profiles/${activeChild.id}`);
                setIsDropdownOpen(false);
              }}
              style={{ cursor: 'pointer' }}
            >
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
                  <button 
                    className="item-switch-btn"
                    onClick={() => {
                      requestSwitchChild(child.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Switch
                  </button>
                </div>
              ))
            ) : (
              <p className="no-other-children">No other children linked</p>
            )}
          </div>

          <div className="dropdown-footer">
            <button
              className="add-child-menu-btn"
              onClick={() => {
                navigate('/family-profiles');
                setIsDropdownOpen(false);
              }}
            >
              <Plus size={16} />
              <span>Add another child</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSwitcher;
