
import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  useMonitoring, 
  useRequests, 
  useAppToasts, 
  usePinWithModals 
} from '../../hooks/App-Controls';

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
  const appToasts = useAppToasts();
  
  // Use refs to pass setters to usePinWithModals to avoid circular dependencies during initialization
  const monitoringRef = useRef({});
  const requestsRef = useRef({});

  const {
    pinManager,
    modalState,
    pendingActions,
    handleVerifyPin,
    handleSetPin,
    handleRemovePin
  } = usePinWithModals(monitoringRef.current, requestsRef.current, appToasts);

  const monitoring = useMonitoring(pendingActions, pinManager, appToasts.showToast);
  const requestsState = useRequests(pendingActions, pinManager, appToasts.showToast);

  // Keep refs in sync with latest state/setters
  useEffect(() => {
    monitoringRef.current = monitoring;
    requestsRef.current = requestsState;
  }, [monitoring, requestsState]);

  const handleLockedClick = () => {
    appToasts.showToast('Set a Security PIN first to configure logout protection', 'warning');
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
                isPinSet={pinManager.isPinSet}
                lastChangedDate={pinManager.lastChangedDate}
                onSetPin={() => modalState.setIsPinModalOpen(true)}
                onRemovePin={handleRemovePin}
              />
            </ControlSection>

            {/* Section 2 & 3: Monitoring & Logout Protection */}
            {!pinManager.isPinSet && <ConfigurationLockedBanner />}

            <RestrictedAccessZone
              isLocked={!pinManager.isPinSet}
              onLockedClick={handleLockedClick}
            >
              <ControlSection title="Monitoring Settings">
                <MonitoringStatus
                  isActive={monitoring.isMonitoringActive}
                  onToggle={monitoring.handleToggleMonitoring}
                />
              </ControlSection>

              <ControlSection title="Logout Protection">
                <LogoutProtection
                  mode={monitoring.logoutMode}
                  onModeChange={monitoring.handleModeChange}
                  pendingRequests={requestsState.requests}
                  onApproveRequest={requestsState.handleApproveRequest}
                  onDenyRequest={requestsState.handleDenyRequest}
                />
              </ControlSection>
            </RestrictedAccessZone>
          </div>
        </div>
      </section>

      {/* All App Control Modals */}
      <AppControlModals
        confirmToggle={{
          isOpen: modalState.isConfirmToggleModalOpen,
          onClose: () => modalState.setIsConfirmToggleModalOpen(false),
          onConfirm: pendingActions.execute
        }}
        pinSetup={{
          isOpen: modalState.isPinModalOpen,
          onClose: () => modalState.setIsPinModalOpen(false),
          onSave: handleSetPin,
          isPinSet: pinManager.isPinSet,
          storedPin: pinManager.storedPin
        }}
        verifyPin={{
          isOpen: modalState.isVerifyModalOpen,
          onClose: () => {
            modalState.setIsVerifyModalOpen(false);
            pendingActions.clearPending();
          },
          onVerify: handleVerifyPin,
          isPendingMonitoringToggle: pendingActions.isPendingMonitoringToggle,
          pendingRequestId: pendingActions.pendingRequestId,
          pendingModeChange: pendingActions.pendingModeChange
        }}
        pinRecommendation={{
          isOpen: modalState.isPinRecommendationModalOpen,
          onClose: () => {
            modalState.setIsPinRecommendationModalOpen(false);
            pendingActions.clearPending();
          },
          onSkip: pendingActions.skip,
          onSetup: () => {
            modalState.setIsPinRecommendationModalOpen(false);
            modalState.setIsPinModalOpen(true);
          },
          isPendingMonitoringToggle: pendingActions.isPendingMonitoringToggle,
          pendingRequestId: pendingActions.pendingRequestId
        }}
        finalConfirm={{
          isOpen: modalState.isFinalConfirmModalOpen,
          onClose: () => {
            modalState.setIsFinalConfirmModalOpen(false);
            pendingActions.clearPending();
          },
          onConfirm: pendingActions.execute,
          actionType: pendingActions.pendingActionType,
          requestData: requestsState.requests.find(r => r.id === pendingActions.pendingRequestId)
        }}
      />

      {/* Toasts */}
      <AnimatePresence>
        {appToasts.toast && (
          <div className="toast-container">
            <Toast
              message={appToasts.toast.message}
              type={appToasts.toast.type}
              onClose={appToasts.closeToast}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppControls;
