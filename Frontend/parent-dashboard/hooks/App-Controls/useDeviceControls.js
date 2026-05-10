
import { useState } from 'react';
import { pendingRequests as initialRequests } from '../../data/App-Controls/AppControlsData';
import usePinManagement from './usePinManagement';
import useModalState from './useModalState';
import usePendingActions from './usePendingActions';

const useDeviceControls = () => {
  // Core Domain State
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [logoutMode, setLogoutMode] = useState('approval');
  const [requests, setRequests] = useState(initialRequests);
  const [toast, setToast] = useState(null);

  // Helpers
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const closeToast = () => setToast(null);

  // Sub-hooks composition
  const pinManager = usePinManagement();
  const modalState = useModalState();

  const pendingActions = usePendingActions({
    requestVerification: (isPinSet) => modalState.openVerificationSequence(isPinSet),
    openFinalConfirm: () => modalState.setIsFinalConfirmModalOpen(true),
    onCloseModals: () => modalState.closeAll(),
    onApprove: (id) => {
      setRequests(prev => prev.filter(r => r.id !== id));
      showToast('Logout request approved');
    },
    onDeny: (id) => {
      setRequests(prev => prev.filter(r => r.id !== id));
      showToast('Logout request denied', 'warning');
    },
    onToggleMonitoring: () => {
      setIsMonitoringActive(false);
      showToast('Monitoring paused', 'warning');
    },
    onModeChange: (mode) => {
      setLogoutMode(mode);
      const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
      showToast(`Logout protection set to ${modeName} Mode`);
    },
    onRequireFinalConfirm: () => {
      modalState.setIsPinRecommendationModalOpen(false);
      modalState.setIsFinalConfirmModalOpen(true);
    }
  });

  // Derived state
  const selectedModeName = logoutMode.charAt(0).toUpperCase() + logoutMode.slice(1);

  // Orchestration Handlers
  const handleToggleMonitoring = () => {
    if (isMonitoringActive) {
      pendingActions.queueMonitoringToggle(pinManager.isPinSet);
    } else {
      setIsMonitoringActive(true);
      showToast('Monitoring resumed successfully');
    }
  };

  const handleModeChange = (mode) => {
    if (mode === logoutMode) return;
    pendingActions.queueModeChange(mode, pinManager.isPinSet);
  };

  const handleApproveRequest = (id) => {
    pendingActions.queueApproveRequest(id, pinManager.isPinSet);
  };

  const handleDenyRequest = (id) => {
    pendingActions.queueDenyRequest(id);
  };

  const handleVerifyPin = (pin) => {
    if (pinManager.verifyPin(pin)) {
      pendingActions.execute();
      return true;
    } else {
      showToast('Incorrect Security PIN', 'danger');
      return false;
    }
  };

  const handleSetPin = (newPin) => {
    pinManager.setPin(newPin);
    modalState.setIsPinModalOpen(false);
    showToast('Security PIN updated successfully');
  };

  const handleRemovePin = () => {
    pinManager.removePin();
    showToast('Security PIN removed', 'warning');
  };

  return {
    monitoring: {
      isActive: isMonitoringActive,
      mode: logoutMode,
      selectedModeName,
      handleToggle: handleToggleMonitoring,
      handleModeChange
    },
    requests: {
      data: requests,
      handleApprove: handleApproveRequest,
      handleDeny: handleDenyRequest
    },
    pin: {
      isSet: pinManager.isPinSet,
      storedPin: pinManager.storedPin,
      lastChangedDate: pinManager.lastChangedDate,
      handleSet: handleSetPin,
      handleVerify: handleVerifyPin,
      handleRemove: handleRemovePin,
      openModal: () => modalState.setIsPinModalOpen(true),
      closeModal: () => modalState.setIsPinModalOpen(false)
    },
    modals: {
      confirmToggle: {
        isOpen: modalState.isConfirmToggleModalOpen,
        onClose: () => modalState.setIsConfirmToggleModalOpen(false),
        onConfirm: pendingActions.execute
      },
      pinSetup: {
        isOpen: modalState.isPinModalOpen,
        onClose: () => modalState.setIsPinModalOpen(false),
        onSave: handleSetPin,
        isPinSet: pinManager.isPinSet,
        storedPin: pinManager.storedPin
      },
      verifyPin: {
        isOpen: modalState.isVerifyModalOpen,
        onClose: () => {
          modalState.setIsVerifyModalOpen(false);
          pendingActions.clearPending();
        },
        onVerify: handleVerifyPin,
        isPendingMonitoringToggle: pendingActions.isPendingMonitoringToggle,
        pendingRequestId: pendingActions.pendingRequestId,
        pendingModeChange: pendingActions.pendingModeChange
      },
      pinRecommendation: {
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
      },
      finalConfirm: {
        isOpen: modalState.isFinalConfirmModalOpen,
        onClose: () => {
          modalState.setIsFinalConfirmModalOpen(false);
          pendingActions.clearPending();
        },
        onConfirm: pendingActions.execute,
        actionType: pendingActions.pendingActionType,
        requestData: requests.find(r => r.id === pendingActions.pendingRequestId)
      }
    },
    toast: {
      data: toast,
      show: showToast,
      close: closeToast
    }
  };
};

export default useDeviceControls;
