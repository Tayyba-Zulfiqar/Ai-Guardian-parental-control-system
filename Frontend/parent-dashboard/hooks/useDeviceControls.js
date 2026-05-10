
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
  const [isScrollHintModalOpen, setIsScrollHintModalOpen] = useState(false);
  const [isPinSet, setIsPinSet] = useState(false);
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
      setIsConfirmToggleModalOpen(true);
    } else {
      setIsMonitoringActive(true);
      showToast('Monitoring resumed successfully');
    }
  };

  const confirmToggleOff = () => {
    setIsMonitoringActive(false);
    setIsConfirmToggleModalOpen(false);
    showToast('Monitoring paused', 'warning');
  };

  const closeConfirmModal = () => setIsConfirmToggleModalOpen(false);

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
    setLastChangedDate(new Date().toLocaleDateString());
    setIsPinModalOpen(false);
    showToast('Security PIN updated successfully');
  };

  const handleRemovePin = () => {
    setIsPinSet(false);
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
    isScrollHintModalOpen,
    selectedModeName,
    isPinSet,
    lastChangedDate,
    
    // Handlers
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
    showToast,
    closeToast
  };
};

export default useDeviceControls;
