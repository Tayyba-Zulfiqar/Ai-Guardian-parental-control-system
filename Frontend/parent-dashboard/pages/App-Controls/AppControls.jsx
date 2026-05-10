
import { AnimatePresence } from 'framer-motion';
import useDeviceControls from '../../hooks/useDeviceControls';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import Toast from '../../components/common/Toast/Toast';
import MonitoringStatus from '../../components/ui/App-Controls/MonitoringStatus/MonitoringStatus';
import LogoutProtection from '../../components/ui/App-Controls/LogoutProtection/LogoutProtection';
import SecurityPIN from '../../components/ui/App-Controls/SecurityPIN/SecurityPIN';

// Extracted Modals
import ConfirmPauseModal from '../../components/ui/App-Controls/modals/ConfirmPauseModal/ConfirmPauseModal';
import ModeHintModal from '../../components/ui/App-Controls/modals/ModeHintModal/ModeHintModal';
import PinSetupModal from '../../components/ui/App-Controls/modals/PinSetupModal/PinSetupModal';
import SecurityPinVerifyModal from '../../components/ui/App-Controls/modals/SecurityPinVerifyModal/SecurityPinVerifyModal';
import PinRecommendationModal from '../../components/ui/App-Controls/modals/PinRecommendationModal/PinRecommendationModal';

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
    isScrollHintModalOpen,
    selectedModeName,
    isPinSet,
    storedPin,
    lastChangedDate,
    pendingModeChange,
    isPendingMonitoringToggle,
    handleToggleMonitoring,
    confirmToggleOff,
    handleSkipAction,
    closeConfirmModal,
    closeVerifyModal,
    closeRecommendationModal,
    handleGoToPinSetup,
    handleModeChange,
    closeHintModal,
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
            {/* Section 1: Monitoring Status */}
            <div className="stats-section">
              <h2 className="dashboard-section-title">Monitoring Settings</h2>
              <MonitoringStatus
                isActive={isMonitoringActive}
                onToggle={handleToggleMonitoring}
              />
            </div>

            {/* Section 2: Security PIN */}
            <div className="stats-section">
              <h2 className="dashboard-section-title">Security & Access</h2>
              <SecurityPIN
                isPinSet={isPinSet}
                lastChangedDate={lastChangedDate}
                onSetPin={openPinModal}
                onRemovePin={handleRemovePin}
              />
            </div>

            {/* Section 3: Logout Protection Mode */}
            <div className="stats-section">
              <h2 className="dashboard-section-title">Logout Protection</h2>
              <LogoutProtection
                mode={logoutMode}
                onModeChange={handleModeChange}
                onSetPin={openPinModal}
                pendingRequests={requests}
                onApproveRequest={handleApproveRequest}
                onDenyRequest={handleDenyRequest}
              />
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
        title={isPendingMonitoringToggle ? "Pause Monitoring" : "Change Protection Mode"}
        description={
          isPendingMonitoringToggle 
            ? "Security PIN required to pause monitoring." 
            : `Enter Security PIN to change to ${pendingModeChange ? pendingModeChange.charAt(0).toUpperCase() + pendingModeChange.slice(1) : ''} Mode.`
        }
        confirmText={isPendingMonitoringToggle ? "Confirm Pause" : "Apply Change"}
      />

      {/* PIN Recommendation Modal */}
      <PinRecommendationModal 
        isOpen={isPinRecommendationModalOpen}
        onClose={closeRecommendationModal}
        onSkip={handleSkipAction}
        onSetup={handleGoToPinSetup}
        title={isPendingMonitoringToggle ? "Security PIN Recommended" : "Protect Your Settings"}
        description={
          isPendingMonitoringToggle
            ? "You haven't set a Security PIN yet. Without a PIN, anyone can disable monitoring."
            : "Without a Security PIN, anyone with access to this dashboard can change protection rules."
        }
        skipText={isPendingMonitoringToggle ? "Skip & Pause" : "Skip & Change"}
      />

      {/* Scroll Hint Modal */}
      <ModeHintModal
        isOpen={isScrollHintModalOpen}
        onClose={closeHintModal}
        selectedModeName={selectedModeName}
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
