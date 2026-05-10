
import usePinManagement from './usePinManagement';
import useModalState from './useModalState';
import usePendingActions from './usePendingActions';

const usePinWithModals = (monitoringActions, requestActions, appToasts) => {
  const pinManager = usePinManagement();
  const modalState = useModalState();

  const pendingActions = usePendingActions({
    requestVerification: (isPinSet) => modalState.openVerificationSequence(isPinSet),
    openFinalConfirm: () => modalState.setIsFinalConfirmModalOpen(true),
    onCloseModals: () => modalState.closeAll(),
    onApprove: (id) => {
      requestActions.setRequests(prev => prev.filter(r => r.id !== id));
      appToasts.showToast('Logout request approved');
    },
    onDeny: (id) => {
      requestActions.setRequests(prev => prev.filter(r => r.id !== id));
      appToasts.showToast('Logout request denied', 'warning');
    },
    onToggleMonitoring: () => {
      monitoringActions.setIsMonitoringActive(false);
      appToasts.showToast('Monitoring paused', 'warning');
    },
    onModeChange: (mode) => {
      monitoringActions.setLogoutMode(mode);
      const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
      appToasts.showToast(`Logout protection set to ${modeName} Mode`);
    },
    onRequireFinalConfirm: () => {
      modalState.setIsPinRecommendationModalOpen(false);
      modalState.setIsFinalConfirmModalOpen(true);
    }
  });

  const handleVerifyPin = (pin) => {
    if (pinManager.verifyPin(pin)) {
      pendingActions.execute();
      return true;
    } else {
      appToasts.showToast('Incorrect Security PIN', 'danger');
      return false;
    }
  };

  const handleSetPin = (newPin) => {
    pinManager.setPin(newPin);
    modalState.setIsPinModalOpen(false);
    appToasts.showToast('Security PIN updated successfully');
  };

  const handleRemovePin = () => {
    pinManager.removePin();
    appToasts.showToast('Security PIN removed', 'warning');
  };

  return {
    pinManager,
    modalState,
    pendingActions,
    handleVerifyPin,
    handleSetPin,
    handleRemovePin
  };
};

export default usePinWithModals;
