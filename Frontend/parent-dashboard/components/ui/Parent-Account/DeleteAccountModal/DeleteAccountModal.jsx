import { useState } from 'react';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import './DeleteAccountModal.css';

/**
 * DeleteAccountModal
 *
 * Props:
 *  onClose       – close the modal without deleting
 *  onConfirm     – (password: string) => void   called when user clicks "Permanently Delete Account"
 *  passwordError – string | null   server-side/auth error message from the parent
 *  isDeleting    – bool            shows loading state while deletion is in progress
 */
const DeleteAccountModal = ({ onClose, onConfirm, passwordError, isDeleting = false }) => {
  const [confirmText, setConfirmText]   = useState('');
  const [password, setPassword]         = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // All three gates must pass before the button is enabled
  const isDeletable =
    hasConfirmed &&
    confirmText === 'DELETE' &&
    password.length >= 1 &&
    !isDeleting;

  const handleSubmit = () => {
    if (!isDeletable) return;
    onConfirm(password);
  };

  return (
    <Modal
      isOpen={true}
      onClose={isDeleting ? undefined : onClose}   // prevent close while deleting
      title="Delete Account?"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={!isDeletable}
          >
            {isDeleting ? 'Deleting…' : 'Permanently Delete Account'}
          </Button>
        </>
      }
    >
      <div className="delete-modal-body">
        {/* Type DELETE to confirm */}
        <div className="form-group">
          <label>
            Type <strong>DELETE</strong> to confirm
          </label>
          <input
            type="text"
            placeholder="DELETE"
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
            disabled={isDeleting}
            autoComplete="off"
          />
        </div>

        {/* Password field with show/hide toggle */}
        <div className="form-group">
          <label>Confirm your password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isDeleting}
              className={passwordError ? 'error-input' : ''}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(prev => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Real-time password error from AuthContext */}
          {passwordError && (
            <span className="delete-error-text">{passwordError}</span>
          )}
        </div>

        {/* Acknowledgement checkbox */}
        <div className="form-group checkbox-confirm">
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={hasConfirmed}
              onChange={() => setHasConfirmed(prev => !prev)}
              disabled={isDeleting}
            />
            <span className="checkbox-custom" />
            <span className="checkbox-label">
              I understand the consequences of deleting my account.
            </span>
          </label>
        </div>

        {/* Warning banner */}
        <div className="warning-box">
          <AlertTriangle size={20} className="warning-icon" />
          <p>
            <strong>Warning:</strong> This action is permanent and cannot be
            reversed. You will lose all child profiles, history, and settings.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
