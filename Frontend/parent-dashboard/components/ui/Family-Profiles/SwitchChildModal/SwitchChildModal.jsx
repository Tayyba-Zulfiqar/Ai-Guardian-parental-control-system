import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Check, Smartphone, Users, AlertTriangle, ChevronRight } from 'lucide-react';
import './SwitchChildModal.css';

const SwitchChildModal = ({ isOpen, onClose, children, activeChildId, onConfirm }) => {
  const [selectedChildId, setSelectedChildId] = useState(null);

  // Filter out the child being removed (the active one)
  const availableChildren = children.filter(child => child.id !== activeChildId);

  useEffect(() => {
    if (isOpen) {
      setSelectedChildId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedChildId) {
      onConfirm(selectedChildId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container modern-pro" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="header-main">
            <div className="header-icon-box">
              <Users size={24} />
            </div>
            <div className="header-text">
              <h2 className="modal-title">Switch Active Child</h2>
              <p className="modal-subtitle">Please select a child to switch to before removing the current one.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body custom-scrollbar">
          <div className="selection-header">
            <span className="label">SELECT A CHILD BELOW</span>
            <span className="count">{availableChildren.length} children</span>
          </div>

          <div className="child-selection-grid">
            {availableChildren.map((child) => (
              <div 
                key={child.id} 
                className={`child-card-pro ${selectedChildId === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChildId(child.id)}
              >
                <div className="card-top">
                  <div className="avatar-circle-pro">
                    {child.avatar}
                  </div>
                  <div className="card-selection-check">
                    <Check size={14} />
                  </div>
                </div>
                
                <div className="card-info">
                  <h4 className="name">{child.name}</h4>
                  <div className="tags">
                    <span className="tag">Age {child.age}</span>
                    <span className="tag device">
                      <Smartphone size={10} />
                      {child.device || 'Device'}
                    </span>
                  </div>
                </div>

                <div className="card-status-indicator">
                  {selectedChildId === child.id ? 'Selected' : 'Select'}
                </div>
              </div>
            ))}
          </div>

          <div className="pro-info-banner yellow-theme">
            <div className="banner-icon">
              <AlertTriangle size={18} />
            </div>
            <div className="banner-content">
              <p>You are removing the currently active child. Please select another child from below to make them active. You cannot remove a child without having at least one active profile.</p>
            </div>
          </div>
        </div>

        <div className="modal-footer pro">
          <button className="btn-secondary back-action" onClick={onClose}>
            <ArrowLeft size={18} />
            <span>BACK</span>
          </button>
          
          <button 
            className={`btn-primary-pro ${!selectedChildId ? 'locked' : ''}`} 
            onClick={handleConfirm}
            disabled={!selectedChildId}
          >
            <span>Confirm & Switch</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchChildModal;
