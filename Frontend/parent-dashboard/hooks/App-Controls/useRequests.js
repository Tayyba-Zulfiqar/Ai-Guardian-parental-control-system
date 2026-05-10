
import { useState } from 'react';
import { pendingRequests as initialRequests } from '../../data/App-Controls/AppControlsData';

const useRequests = (pendingActions, pinManager, showToast) => {
  const [requests, setRequests] = useState(initialRequests);

  const handleApproveRequest = (id) => {
    pendingActions.queueApproveRequest(id, pinManager.isPinSet);
  };

  const handleDenyRequest = (id) => {
    pendingActions.queueDenyRequest(id);
  };

  return { 
    requests, 
    setRequests, 
    handleApproveRequest, 
    handleDenyRequest 
  };
};

export default useRequests;
