
import { useState } from 'react';

const usePendingActions = (actions) => {
  const [pendingModeChange, setPendingModeChange] = useState(null);
  const [isPendingMonitoringToggle, setIsPendingMonitoringToggle] = useState(false);
  const [pendingRequestId, setPendingRequestId] = useState(null);
  const [pendingActionType, setPendingActionType] = useState(null);

  const clearPending = () => {
    setPendingModeChange(null);
    setIsPendingMonitoringToggle(false);
    setPendingRequestId(null);
    setPendingActionType(null);
  };

  const queueMonitoringToggle = (isPinSet) => {
    clearPending();
    setIsPendingMonitoringToggle(true);
    actions.requestVerification(isPinSet);
  };

  const queueModeChange = (mode, isPinSet) => {
    clearPending();
    setPendingModeChange(mode);
    actions.requestVerification(isPinSet);
  };

  const queueApproveRequest = (id, isPinSet) => {
    clearPending();
    setPendingRequestId(id);
    setPendingActionType('approve');
    actions.requestVerification(isPinSet);
  };

  const queueDenyRequest = (id) => {
    clearPending();
    setPendingRequestId(id);
    setPendingActionType('deny');
    actions.openFinalConfirm();
  };

  const execute = () => {
    if (pendingActionType === 'approve') {
      actions.onApprove(pendingRequestId);
    } else if (pendingActionType === 'deny') {
      actions.onDeny(pendingRequestId);
    } else if (isPendingMonitoringToggle) {
      actions.onToggleMonitoring();
    } else if (pendingModeChange) {
      actions.onModeChange(pendingModeChange);
    }
    clearPending();
    actions.onCloseModals();
  };

  const skip = () => {
    if (isPendingMonitoringToggle) {
      actions.onToggleMonitoring();
    } else if (pendingModeChange) {
      actions.onModeChange(pendingModeChange);
    } else if (pendingRequestId && pendingActionType === 'approve') {
      actions.onRequireFinalConfirm();
    }
  };

  return {
    pendingModeChange,
    isPendingMonitoringToggle,
    pendingRequestId,
    pendingActionType,
    queueMonitoringToggle,
    queueModeChange,
    queueApproveRequest,
    queueDenyRequest,
    execute,
    skip,
    clearPending
  };
};

export default usePendingActions;
