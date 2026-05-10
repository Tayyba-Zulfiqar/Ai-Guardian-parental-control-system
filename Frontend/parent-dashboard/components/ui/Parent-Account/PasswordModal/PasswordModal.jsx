import { useState } from 'react';
import { Lock } from 'lucide-react';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import './PasswordModal.css';

const PasswordModal = ({ onClose, onSave }) => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Change Password"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={onSave} 
            disabled={!passwords.new || passwords.new !== passwords.confirm}
          >
            Update Password
          </Button>
        </>
      }
    >
      <div className="password-modal-body">
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
    </Modal>
  );
};

export default PasswordModal;

