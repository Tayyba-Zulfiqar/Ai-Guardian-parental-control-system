import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import './DeleteAccountModal.css';

const DeleteAccountModal = ({ onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const isDeletable = hasConfirmed && confirmText === 'DELETE' && password.length >= 6;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Delete Account?"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            disabled={!isDeletable}
          >
            Permanently Delete Account
          </Button>
        </>
      }
    >
      <div className="delete-modal-body">
        <div className="warning-box">
          <AlertTriangle size={20} className="warning-icon" />
          <p><strong>Warning:</strong> This action is permanent and cannot be reversed. You will lose all child profiles, history, and settings.</p>
        </div>
        
        <div className="form-group checkbox-confirm">
          <label className="checkbox-item">
            <input 
              type="checkbox" 
              checked={hasConfirmed}
              onChange={() => setHasConfirmed(!hasConfirmed)}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label">I understand the consequences of deleting my account.</span>
          </label>
        </div>

        <div className="form-group">
          <label>Type <strong>DELETE</strong> to confirm</label>
          <input 
            type="text" 
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm your password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;

