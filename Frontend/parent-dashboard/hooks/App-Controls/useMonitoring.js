
import { useState } from 'react';

const useMonitoring = (pendingActions, pinManager, showToast) => {
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [logoutMode, setLogoutMode] = useState('approval');

  const selectedModeName = logoutMode.charAt(0).toUpperCase() + logoutMode.slice(1);

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

  return { 
    isMonitoringActive, 
    setIsMonitoringActive,
    logoutMode, 
    setLogoutMode,
    selectedModeName, 
    handleToggleMonitoring, 
    handleModeChange 
  };
};

export default useMonitoring;
