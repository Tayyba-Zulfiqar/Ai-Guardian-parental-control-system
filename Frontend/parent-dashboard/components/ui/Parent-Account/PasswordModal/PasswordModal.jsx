import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import './PasswordModal.css';

const PasswordModal = ({ onClose, onSave }) => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-icon">
            <Lock size={20} />
            <h2>Change Password</h2>
          </div>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Current Password</label>
            <input 
              type="password" 
              placeholder="Enter current password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="Min. 8 characters"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              placeholder="Repeat new password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onSave} disabled={!passwords.new || passwords.new !== passwords.confirm}>
            Update Password
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PasswordModal;
