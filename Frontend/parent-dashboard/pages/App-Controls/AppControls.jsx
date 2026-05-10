
import { AnimatePresence } from 'framer-motion';
import useDeviceControls from '../../hooks/useDeviceControls';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import Toast from '../../components/common/Toast/Toast';
import MonitoringStatus from '../../components/ui/App-Controls/MonitoringStatus/MonitoringStatus';
import LogoutProtection from '../../components/ui/App-Controls/LogoutProtection/LogoutProtection';
import SecurityPIN from '../../components/ui/App-Controls/SecurityPIN/SecurityPIN';

// Extracted Modals
import ConfirmPauseModal from '../../components/ui/App-Controls/modals/ConfirmPauseModal/ConfirmPauseModal';
import PinSetupModal from '../../components/ui/App-Controls/modals/PinSetupModal/PinSetupModal';
import SecurityPinVerifyModal from '../../components/ui/App-Controls/modals/SecurityPinVerifyModal/SecurityPinVerifyModal';
import PinRecommendationModal from '../../components/ui/App-Controls/modals/PinRecommendationModal/PinRecommendationModal';
import RequestActionModal from '../../components/ui/App-Controls/modals/RequestActionModal/RequestActionModal';

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
    selectedModeName,
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
    closeToast
  } = useDeviceControls();

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
            <div className="stats-section">
              <h2 className="dashboard-section-title">Security & Access</h2>
              <SecurityPIN
                isPinSet={isPinSet}
                lastChangedDate={lastChangedDate}
                onSetPin={openPinModal}
                onRemovePin={handleRemovePin}
              />
            </div>

            {/* Section 2: Monitoring Status & Section 3: Logout Protection */}
            {!isPinSet && (
              <div className="restricted-banner">
                <div className="lock-icon-box">
                  <span role="img" aria-label="lock">🔒</span>
                </div>
                <div className="banner-text-content">
                  <h3>Configuration Locked</h3>
                  <p>Set a Security PIN above to enable monitoring and logout protection settings.</p>
                </div>
              </div>
            )}

            <div 
              className={`restricted-access-zone ${!isPinSet ? 'is-disabled' : ''}`}
              onClick={() => {
                if (!isPinSet) {
                  showToast('Set a Security PIN first to configure logout protection', 'warning');
                }
              }}
            >
              {/* Section 2: Monitoring Status */}
              <div className="stats-section">
                <h2 className="dashboard-section-title">Monitoring Settings</h2>
                <MonitoringStatus
                  isActive={isMonitoringActive}
                  onToggle={handleToggleMonitoring}
                />
              </div>

              {/* Section 3: Logout Protection Mode */}
              <div className="stats-section">
                <h2 className="dashboard-section-title">Logout Protection</h2>
                <LogoutProtection
                  mode={logoutMode}
                  onModeChange={handleModeChange}
                  pendingRequests={requests}
                  onApproveRequest={handleApproveRequest}
                  onDenyRequest={handleDenyRequest}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal for Monitoring */}
      <ConfirmPauseModal
        isOpen={isConfirmToggleModalOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmToggleOff}
      />

      {/* PIN Modal */}
      <PinSetupModal
        isOpen={isPinModalOpen}
        onClose={closePinModal}
        onSave={handleSetPin}
        isPinSet={isPinSet}
        storedPin={storedPin}
      />

      {/* Security PIN Verification Modal */}
      <SecurityPinVerifyModal 
        isOpen={isVerifyModalOpen}
        onClose={closeVerifyModal}
        onVerify={handleVerifyPin}
        title={
          isPendingMonitoringToggle ? "Pause Monitoring" : 
          pendingRequestId ? "Approve Logout Request" : 
          "Change Protection Mode"
        }
        description={
          isPendingMonitoringToggle 
            ? "Security PIN required to pause monitoring." 
            : pendingRequestId
            ? "Enter Security PIN to approve this logout request."
            : `Enter Security PIN to change to ${pendingModeChange ? pendingModeChange.charAt(0).toUpperCase() + pendingModeChange.slice(1) : ''} Mode.`
        }
        confirmText={
          isPendingMonitoringToggle ? "Confirm Pause" : 
          pendingRequestId ? "Approve Request" : 
          "Apply Change"
        }
      />

      {/* PIN Recommendation Modal */}
      <PinRecommendationModal 
        isOpen={isPinRecommendationModalOpen}
        onClose={closeRecommendationModal}
        onSkip={handleSkipAction}
        onSetup={handleGoToPinSetup}
        title={
          isPendingMonitoringToggle ? "Security PIN Recommended" : 
          pendingRequestId ? "Secure Approval Required" :
          "Protect Your Settings"
        }
        description={
          isPendingMonitoringToggle
            ? "You haven't set a Security PIN yet. Without a PIN, anyone can disable monitoring."
            : pendingRequestId
            ? "You haven't set a Security PIN. Without a PIN, anyone with access to this device can approve logout requests."
            : "Without a Security PIN, anyone with access to this dashboard can change protection rules."
        }
        skipText={
          isPendingMonitoringToggle ? "Skip & Pause" : 
          pendingRequestId ? "Skip & Approve" :
          "Skip & Change"
        }
      />

      {/* Final Request Confirmation Modal (Approve/Reject) */}
      <RequestActionModal 
        isOpen={isFinalConfirmModalOpen}
        onClose={closeFinalConfirmModal}
        onConfirm={executePendingRequestAction}
        actionType={pendingActionType}
        requestData={requests.find(r => r.id === pendingRequestId)}
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
