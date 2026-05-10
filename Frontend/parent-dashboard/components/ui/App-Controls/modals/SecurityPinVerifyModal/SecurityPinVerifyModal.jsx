
import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Modal from '../../../../common/Modal/Modal';
import Button from '../../../../common/Button/Button';
import './SecurityPinVerifyModal.css';

const SecurityPinVerifyModal = ({ isOpen, onClose, onVerify }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = () => {
    const success = onVerify(pin);
    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setError(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Enter Security PIN"
      size="small"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleVerify}>Confirm Pause</Button>
        </>
      }
    >
      <div className="verify-pin-content">
        <div className="verify-header">
          <div className="lock-icon-wrapper">
            <Lock size={24} />
          </div>
          <p>Security PIN required to pause monitoring.</p>
        </div>

        <div className="pin-input-group">
          <div className="pin-input-wrapper">
            <input
              type={showPin ? "text" : "password"}
              maxLength="6"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''));
                setError(false);
              }}
              placeholder="●●●●"
              className={`pin-field ${error ? 'error' : ''}`}
              autoFocus
            />
            <button 
              className="pin-visibility-toggle"
              onClick={() => setShowPin(!showPin)}
              type="button"
            >
              {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && (
            <div className="error-message">
              <AlertCircle size={14} />
              <span>Incorrect PIN. Please try again.</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SecurityPinVerifyModal;
