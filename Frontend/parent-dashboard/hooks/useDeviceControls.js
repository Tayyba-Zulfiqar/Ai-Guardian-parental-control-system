
import { useState } from 'react';
import { pendingRequests as initialRequests } from '../data/App-Controls/AppControlsData';

const useDeviceControls = () => {
  // State
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [logoutMode, setLogoutMode] = useState('approval');
  const [requests, setRequests] = useState(initialRequests);
  const [toast, setToast] = useState(null);

  // Modal States
  const [isConfirmToggleModalOpen, setIsConfirmToggleModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isPinRecommendationModalOpen, setIsPinRecommendationModalOpen] = useState(false);
  const [isFinalConfirmModalOpen, setIsFinalConfirmModalOpen] = useState(false);
  const [isPinSet, setIsPinSet] = useState(false);
  const [storedPin, setStoredPin] = useState('');
  const [lastChangedDate, setLastChangedDate] = useState('');

  // Pending Actions
  const [pendingModeChange, setPendingModeChange] = useState(null);
  const [isPendingMonitoringToggle, setIsPendingMonitoringToggle] = useState(false);
  const [pendingRequestId, setPendingRequestId] = useState(null);
  const [pendingActionType, setPendingActionType] = useState(null); // 'approve' or 'deny'

  // Derived state
  const selectedModeName = logoutMode.charAt(0).toUpperCase() + logoutMode.slice(1);

  // Handlers
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const closeToast = () => setToast(null);

  const handleToggleMonitoring = () => {
    if (isMonitoringActive) {
      clearPendingActions();
      setIsPendingMonitoringToggle(true);
      if (isPinSet) {
        setIsVerifyModalOpen(true);
      } else {
        setIsPinRecommendationModalOpen(true);
      }
    } else {
      setIsMonitoringActive(true);
      showToast('Monitoring resumed successfully');
    }
  };

  const applyMonitoringToggle = () => {
    setIsMonitoringActive(false);
    setIsConfirmToggleModalOpen(false);
    setIsVerifyModalOpen(false);
    setIsPinRecommendationModalOpen(false);
    setIsPendingMonitoringToggle(false);
    showToast('Monitoring paused', 'warning');
  };

  const handleModeChange = (mode) => {
    if (mode === logoutMode) return;

    clearPendingActions();
    setPendingModeChange(mode);
    
    if (isPinSet) {
      setIsVerifyModalOpen(true);
    } else {
      setIsPinRecommendationModalOpen(true);
    }
  };

  const applyModeChange = (mode) => {
    setLogoutMode(mode);
    const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
    showToast(`Logout protection set to ${modeName} Mode`);
    setPendingModeChange(null);
    setIsVerifyModalOpen(false);
    setIsPinRecommendationModalOpen(false);
  };

  const handleApproveRequest = (id) => {
    clearPendingActions();
    setPendingRequestId(id);
    setPendingActionType('approve');
    
    if (isPinSet) {
      setIsVerifyModalOpen(true);
    } else {
      setIsPinRecommendationModalOpen(true);
    }
  };

  const handleDenyRequest = (id) => {
    clearPendingActions();
    setPendingRequestId(id);
    setPendingActionType('deny');
    setIsFinalConfirmModalOpen(true);
  };

  const executePendingRequestAction = () => {
    if (pendingActionType === 'approve') {
      setRequests(requests.filter(r => r.id !== pendingRequestId));
      showToast('Logout request approved');
    } else if (pendingActionType === 'deny') {
      setRequests(requests.filter(r => r.id !== pendingRequestId));
      showToast('Logout request denied', 'warning');
    }
    clearPendingActions();
    setIsFinalConfirmModalOpen(false);
    setIsVerifyModalOpen(false);
    setIsPinRecommendationModalOpen(false);
  };

  const handleSkipAction = () => {
    if (isPendingMonitoringToggle) {
      applyMonitoringToggle();
    } else if (pendingModeChange) {
      applyModeChange(pendingModeChange);
    } else if (pendingRequestId && pendingActionType === 'approve') {
      setIsPinRecommendationModalOpen(false);
      setIsFinalConfirmModalOpen(true);
    }
  };

  const clearPendingActions = () => {
    setPendingModeChange(null);
    setIsPendingMonitoringToggle(false);
    setPendingRequestId(null);
    setPendingActionType(null);
  };

  const closeConfirmModal = () => setIsConfirmToggleModalOpen(false);
  const closeVerifyModal = () => {
    setIsVerifyModalOpen(false);
    clearPendingActions();
  };
  const closeRecommendationModal = () => {
    setIsPinRecommendationModalOpen(false);
    clearPendingActions();
  };
  const closeFinalConfirmModal = () => {
    setIsFinalConfirmModalOpen(false);
    clearPendingActions();
  };

  const handleGoToPinSetup = () => {
    setIsPinRecommendationModalOpen(false);
    setIsPinModalOpen(true);
  };

  const openPinModal = () => setIsPinModalOpen(true);
  const closePinModal = () => setIsPinModalOpen(false);

  const handleSetPin = (newPin) => {
    setIsPinSet(true);
    setStoredPin(newPin);
    setLastChangedDate(new Date().toLocaleDateString());
    setIsPinModalOpen(false);
    showToast('Security PIN updated successfully');
  };

  const handleVerifyPin = (pin) => {
    if (pin === storedPin) {
      if (isPendingMonitoringToggle) {
        applyMonitoringToggle();
      } else if (pendingModeChange) {
        applyModeChange(pendingModeChange);
      } else if (pendingRequestId && pendingActionType === 'approve') {
        setIsVerifyModalOpen(false);
        setIsFinalConfirmModalOpen(true);
      }
      return true;
    } else {
      showToast('Incorrect Security PIN', 'danger');
      return false;
    }
  };

  const handleRemovePin = () => {
    setIsPinSet(false);
    setStoredPin('');
    setLastChangedDate('');
    showToast('Security PIN removed', 'warning');
  };

  return {
    // State
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
    
    // Handlers
    handleToggleMonitoring,
    confirmToggleOff: applyMonitoringToggle,
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
    showToast,
    closeToast
  };
};

export default useDeviceControls;
