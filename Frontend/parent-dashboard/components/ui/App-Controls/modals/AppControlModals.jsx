
import React from 'react';
import ConfirmPauseModal from './ConfirmPauseModal/ConfirmPauseModal';
import PinSetupModal from './PinSetupModal/PinSetupModal';
import SecurityPinVerifyModal from './SecurityPinVerifyModal/SecurityPinVerifyModal';
import PinRecommendationModal from './PinRecommendationModal/PinRecommendationModal';
import RequestActionModal from './RequestActionModal/RequestActionModal';

const AppControlModals = ({
  confirmToggle,
  pinSetup,
  verifyPin,
  pinRecommendation,
  finalConfirm
}) => {
  // Helper to format mode names
  const formatModeName = (mode) => mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : '';

  return (
    <>
      {/* Confirmation Modal for Monitoring */}
      <ConfirmPauseModal
        isOpen={confirmToggle.isOpen}
        onClose={confirmToggle.onClose}
        onConfirm={confirmToggle.onConfirm}
      />

      {/* PIN Setup Modal */}
      <PinSetupModal
        isOpen={pinSetup.isOpen}
        onClose={pinSetup.onClose}
        onSave={pinSetup.onSave}
        isPinSet={pinSetup.isPinSet}
        storedPin={pinSetup.storedPin}
      />

      {/* Security PIN Verification Modal */}
      <SecurityPinVerifyModal 
        isOpen={verifyPin.isOpen}
        onClose={verifyPin.onClose}
        onVerify={verifyPin.onVerify}
        title={
          verifyPin.isPendingMonitoringToggle ? "Pause Monitoring" : 
          verifyPin.pendingRequestId ? "Approve Logout Request" : 
          "Change Protection Mode"
        }
        description={
          verifyPin.isPendingMonitoringToggle 
            ? "Security PIN required to pause monitoring." 
            : verifyPin.pendingRequestId
            ? "Enter Security PIN to approve this logout request."
            : `Enter Security PIN to change to ${formatModeName(verifyPin.pendingModeChange)} Mode.`
        }
        confirmText={
          verifyPin.isPendingMonitoringToggle ? "Confirm Pause" : 
          verifyPin.pendingRequestId ? "Approve Request" : 
          "Apply Change"
        }
      />

      {/* PIN Recommendation Modal */}
      <PinRecommendationModal 
        isOpen={pinRecommendation.isOpen}
        onClose={pinRecommendation.onClose}
        onSkip={pinRecommendation.onSkip}
        onSetup={pinRecommendation.onSetup}
        title={
          pinRecommendation.isPendingMonitoringToggle ? "Security PIN Recommended" : 
          pinRecommendation.pendingRequestId ? "Secure Approval Required" :
          "Protect Your Settings"
        }
        description={
          pinRecommendation.isPendingMonitoringToggle
            ? "You haven't set a Security PIN yet. Without a PIN, anyone can disable monitoring."
            : pinRecommendation.pendingRequestId
            ? "You haven't set a Security PIN. Without a PIN, anyone with access to this device can approve logout requests."
            : "Without a Security PIN, anyone with access to this dashboard can change protection rules."
        }
        skipText={
          pinRecommendation.isPendingMonitoringToggle ? "Skip & Pause" : 
          pinRecommendation.pendingRequestId ? "Skip & Approve" :
          "Skip & Change"
        }
      />

      {/* Final Request Confirmation Modal (Approve/Reject) */}
      <RequestActionModal 
        isOpen={finalConfirm.isOpen}
        onClose={finalConfirm.onClose}
        onConfirm={finalConfirm.onConfirm}
        actionType={finalConfirm.actionType}
        requestData={finalConfirm.requestData}
      />
    </>
  );
};

export default AppControlModals;
