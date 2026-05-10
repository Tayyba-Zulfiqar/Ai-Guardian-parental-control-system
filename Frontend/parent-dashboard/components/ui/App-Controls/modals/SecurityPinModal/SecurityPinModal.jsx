
import { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, X } from 'lucide-react';
import Button from '../../../../common/Button/Button';
import './SecurityPinModal.css';

const SecurityPinModal = ({ onSave, onCancel, initialPin = '' }) => {
  const [pin, setPin] = useState(initialPin);
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: '#ef4444' });
  const [error, setError] = useState('');

  useEffect(() => {
    calculateStrength(pin);
  }, [pin]);

  const calculateStrength = (p) => {
    if (!p) {
      setStrength({ score: 0, label: 'None', color: '#e2e8f0' });
      return;
    }
    
    let score = 0;
    if (p.length >= 4) score += 1;
    if (p.length >= 6) score += 1;
    
    // Check for repetitive or sequential numbers
    const isRepetitive = /^(\d)\1+$/.test(p);
    const isSequential = '0123456789876543210'.includes(p);
    
    if (!isRepetitive && !isSequential && p.length >= 4) score += 1;
    if (p.length >= 6 && !isRepetitive && !isSequential) score += 1;

    if (score <= 1) {
      setStrength({ score: 1, label: 'Weak', color: '#ef4444' });
    } else if (score === 2) {
      setStrength({ score: 2, label: 'Medium', color: '#f59e0b' });
    } else {
      setStrength({ score: 3, label: 'Strong', color: '#22c55e' });
    }
  };

  const handleSave = () => {
    if (pin.length < 4) {
      setError('PIN must be 4-6 digits');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }
    onSave(pin);
  };

  return (
    <div className="security-pin-modal-content">
      <div className="pin-input-section">
        <label className="pin-label">Enter new PIN (4-6 digits)</label>
        <div className="pin-input-wrapper">
          <input
            type={showPin ? "text" : "password"}
            maxLength="6"
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setPin(val);
              setError('');
            }}
            placeholder="●●●●"
            className="pin-field"
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
      </div>

      <div className="pin-input-section">
        <label className="pin-label">Confirm PIN</label>
        <div className="pin-input-wrapper">
          <input
            type="password"
            maxLength="6"
            value={confirmPin}
            onChange={(e) => {
              setConfirmPin(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            placeholder="●●●●"
            className="pin-field"
          />
        </div>
      </div>

      <div className="pin-strength-container">
        <span className="strength-text">PIN Strength:</span>
        <div className="strength-meter">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`strength-bar ${strength.score >= step ? 'active' : ''}`}
              style={{ backgroundColor: strength.score >= step ? strength.color : '#e2e8f0' }}
            ></div>
          ))}
        </div>
        <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
      </div>

      {error && (
        <div className="pin-error-msg">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="modal-actions-divider"></div>

      <div className="modal-footer-btns">
        <Button variant="secondary" onClick={onCancel}>CANCEL</Button>
        <Button variant="primary" onClick={handleSave}>SAVE PIN</Button>
      </div>
    </div>
  );
};

export default SecurityPinModal;
