
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useDeviceControls from '../../hooks/useDeviceControls';

// Common Components
import PageHeader from '../../components/common/PageHeader/PageHeader';
import Toast from '../../components/common/Toast/Toast';

// Shared App Control Components
import ControlSection from '../../components/ui/App-Controls/shared/ControlSection';
import ConfigurationLockedBanner from '../../components/ui/App-Controls/shared/ConfigurationLockedBanner';
import RestrictedAccessZone from '../../components/ui/App-Controls/shared/RestrictedAccessZone';

// Section Components
import MonitoringStatus from '../../components/ui/App-Controls/sections/MonitoringStatus/MonitoringStatus';
import LogoutProtection from '../../components/ui/App-Controls/sections/LogoutProtection/LogoutProtection';
import SecurityPIN from '../../components/ui/App-Controls/sections/SecurityPIN/SecurityPIN';

// Consolidated Modals
import AppControlModals from '../../components/ui/App-Controls/modals/AppControlModals';

import './AppControls.css';

const AppControls = () => {
  const {
    isMonitoringActive,
    logoutMode,
    requests,
    toast,
    isConfirmToggleModalOpen,
    isPinModalOpen,
    isVerifyModalOpen,
    isPinRecommendationModalOpen,
    isFinalConfirmModalOpen,
    isPinSet,
    storedPin,
    lastChangedDate,
    pendingModeChange,
    isPendingMonitoringToggle,
    pendingRequestId,
    pendingActionType,
    handleToggleMonitoring,
    confirmToggleOff,
    handleSkipAction,
    closeConfirmModal,
    closeVerifyModal,
    closeRecommendationModal,
    closeFinalConfirmModal,
    executePendingRequestAction,
    handleGoToPinSetup,
    handleModeChange,
    handleApproveRequest,
    handleDenyRequest,
    openPinModal,
    closePinModal,
    handleSetPin,
    handleVerifyPin,
    handleRemovePin,
    closeToast,
    showToast
  } = useDeviceControls();

  const handleLockedClick = () => {
    showToast('Set a Security PIN first to configure logout protection', 'warning');
  };

  return (
    <div className="app-controls-page">
      <PageHeader
        title="Device Controls"
        subtitle="Manage monitoring and logout protection rules"
      />

      <section className="dashboard-content">
        <div className="controls-grid single-column">
          <div className="controls-main">
            {/* Section 1: Security PIN */}
            <ControlSection title="Security & Access">
              <SecurityPIN
                isPinSet={isPinSet}
                lastChangedDate={lastChangedDate}
                onSetPin={openPinModal}
                onRemovePin={handleRemovePin}
              />
            </ControlSection>

            {/* Section 2 & 3: Monitoring & Logout Protection */}
            {!isPinSet && <ConfigurationLockedBanner />}

            <RestrictedAccessZone 
              isLocked={!isPinSet} 
              onLockedClick={handleLockedClick}
            >
              <ControlSection title="Monitoring Settings">
                <MonitoringStatus
                  isActive={isMonitoringActive}
                  onToggle={handleToggleMonitoring}
                />
              </ControlSection>

              <ControlSection title="Logout Protection">
                <LogoutProtection
                  mode={logoutMode}
                  onModeChange={handleModeChange}
                  pendingRequests={requests}
                  onApproveRequest={handleApproveRequest}
                  onDenyRequest={handleDenyRequest}
                />
              </ControlSection>
            </RestrictedAccessZone>
          </div>
        </div>
      </section>

      {/* All App Control Modals */}
      <AppControlModals 
        confirmToggle={{ 
          isOpen: isConfirmToggleModalOpen, 
          onClose: closeConfirmModal, 
          onConfirm: confirmToggleOff 
        }}
        pinSetup={{ 
          isOpen: isPinModalOpen, 
          onClose: closePinModal, 
          onSave: handleSetPin, 
          isPinSet, 
          storedPin 
        }}
        verifyPin={{ 
          isOpen: isVerifyModalOpen, 
          onClose: closeVerifyModal, 
          onVerify: handleVerifyPin,
          isPendingMonitoringToggle,
          pendingRequestId,
          pendingModeChange
        }}
        pinRecommendation={{ 
          isOpen: isPinRecommendationModalOpen, 
          onClose: closeRecommendationModal, 
          onSkip: handleSkipAction, 
          onSetup: handleGoToPinSetup,
          isPendingMonitoringToggle,
          pendingRequestId
        }}
        finalConfirm={{ 
          isOpen: isFinalConfirmModalOpen, 
          onClose: closeFinalConfirmModal, 
          onConfirm: executePendingRequestAction, 
          actionType: pendingActionType,
          requestData: requests.find(r => r.id === pendingRequestId)
        }}
      />

      {/* Toasts */}
      <AnimatePresence>
        {toast && (
          <div className="toast-container">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={closeToast}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppControls;
