
import { AnimatePresence } from 'framer-motion';
import useDeviceControls from '../../hooks/useDeviceControls';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import Toast from '../../components/common/Toast/Toast';
import MonitoringStatus from '../../components/ui/App-Controls/MonitoringStatus';
import LogoutProtection from '../../components/ui/App-Controls/LogoutProtection';
import SecurityPIN from '../../components/ui/App-Controls/SecurityPIN';

// Extracted Modals
import ConfirmPauseModal from '../../components/ui/App-Controls/modals/ConfirmPauseModal';
import ModeHintModal from '../../components/ui/App-Controls/modals/ModeHintModal';
import PinSetupModal from '../../components/ui/App-Controls/modals/PinSetupModal';

import './AppControls.css';

const AppControls = () => {
  const {
    isMonitoringActive,
    logoutMode,
    requests,
    toast,
    isConfirmToggleModalOpen,
    isPinModalOpen,
    isScrollHintModalOpen,
    selectedModeName,
    isPinSet,
    lastChangedDate,
    handleToggleMonitoring,
    confirmToggleOff,
    closeConfirmModal,
    handleModeChange,
    closeHintModal,
    handleApproveRequest,
    handleDenyRequest,
    openPinModal,
    closePinModal,
    handleSetPin,
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
