
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
  const [isScrollHintModalOpen, setIsScrollHintModalOpen] = useState(false);
  const [isPinSet, setIsPinSet] = useState(false);
  const [storedPin, setStoredPin] = useState('');
  const [lastChangedDate, setLastChangedDate] = useState('');

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

  const confirmToggleOff = () => {
    setIsMonitoringActive(false);
    setIsConfirmToggleModalOpen(false);
    setIsVerifyModalOpen(false);
    setIsPinRecommendationModalOpen(false);
    showToast('Monitoring paused', 'warning');
  };

  const closeConfirmModal = () => setIsConfirmToggleModalOpen(false);
  const closeVerifyModal = () => setIsVerifyModalOpen(false);
  const closeRecommendationModal = () => setIsPinRecommendationModalOpen(false);

  const handleGoToPinSetup = () => {
    setIsPinRecommendationModalOpen(false);
    setIsPinModalOpen(true);
  };

  const handleModeChange = (mode) => {
    setLogoutMode(mode);
    setIsScrollHintModalOpen(true);
    const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
    showToast(`Logout protection set to ${modeName} Mode`);
  };

  const closeHintModal = () => setIsScrollHintModalOpen(false);

  const handleApproveRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
    showToast('Logout request approved');
  };

  const handleDenyRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
    showToast('Logout request denied', 'warning');
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
      confirmToggleOff();
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
    isScrollHintModalOpen,
    selectedModeName,
    isPinSet,
    storedPin,
    lastChangedDate,
    
    // Handlers
    handleToggleMonitoring,
    confirmToggleOff,
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
    showToast,
    closeToast
  };
};

export default useDeviceControls;
