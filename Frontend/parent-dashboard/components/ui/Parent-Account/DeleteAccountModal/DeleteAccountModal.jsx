import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import './DeleteAccountModal.css';

const DeleteAccountModal = ({ onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const isDeletable = hasConfirmed && confirmText === 'DELETE' && password.length >= 6;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content danger"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-icon red">
            <AlertTriangle size={20} />
            <h2>Delete Account?</h2>
          </div>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="warning-box">
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
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm} disabled={!isDeletable}>
            Permanently Delete Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteAccountModal;
