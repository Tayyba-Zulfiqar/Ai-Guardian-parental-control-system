
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Modal from '../../../../common/Modal/Modal';
import Button from '../../../../common/Button/Button';
import './RequestActionModal.css';

const RequestActionModal = ({ isOpen, onClose, onConfirm, actionType, requestData }) => {
  const isApprove = actionType === 'approve';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isApprove ? "Confirm Approval" : "Confirm Rejection"}
      size="small"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button 
            variant={isApprove ? "primary" : "danger"} 
            onClick={onConfirm}
          >
            Yes, {isApprove ? "Approve" : "Reject"}
          </Button>
        </>
      }
    >
      <div className="request-confirm-content">
        <div className={`action-icon-wrapper ${isApprove ? 'approve' : 'reject'}`}>
          {isApprove ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
        </div>
        <div className="confirm-text">
          <p className="confirm-main">
            Are you sure you want to {isApprove ? 'approve' : 'reject'} this logout request?
          </p>
          {requestData && (
            <div className="request-summary-box">
              <span className="summary-child">{requestData.childName}</span>
              <span className="summary-device">{requestData.deviceName}</span>
            </div>
          )}
          <p className="confirm-sub">
            {isApprove 
              ? "The child will be able to logout from their device immediately."
              : "The logout request will be dismissed and the child will remain logged in."
            }
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default RequestActionModal;
