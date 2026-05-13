import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { passwordSchema } from '../../../../src/validations/auth/signupSchema';
import { useAuth } from '../../../../context/AuthContext';
import { Lock } from 'lucide-react';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import './PasswordModal.css';

const changePasswordSchema = z.object({
  current: z.string().min(1, 'Current password is required'),
  new: passwordSchema,
  confirm: z.string().min(1, 'Please confirm your new password')
}).refine((data) => data.new === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm']
});

const PasswordModal = ({ onClose, onSave }) => {
  const { changePassword } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setServerError('');
    const result = changePassword(data.current, data.new);
    if (result.success) {
      onSave(); // Closes modal and shows toast
    } else {
      setServerError(result.error || 'Failed to change password');
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Change Password"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit(onSubmit)} 
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </>
      }
    >
      <form className="password-modal-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Current Password</label>
          <input 
            type="password" 
            placeholder="Enter current password"
            {...register('current')}
            className={errors.current ? 'error-input' : ''}
          />
          {errors.current && <span className="error-text" style={{color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.25rem'}}>{errors.current.message}</span>}
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input 
            type="password" 
            placeholder="Min. 6 chars, uppercase, lowercase, number, symbol"
            {...register('new')}
            className={errors.new ? 'error-input' : ''}
          />
          {errors.new && <span className="error-text" style={{color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.25rem'}}>{errors.new.message}</span>}
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input 
            type="password" 
            placeholder="Repeat new password"
            {...register('confirm')}
            className={errors.confirm ? 'error-input' : ''}
          />
          {errors.confirm && <span className="error-text" style={{color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.25rem'}}>{errors.confirm.message}</span>}
        </div>
        
        {serverError && (
          <div className="error-text" style={{color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem', textAlign: 'center'}}>
            {serverError}
          </div>
        )}
        
        {/* Hidden submit button to allow Enter key submission */}
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </Modal>
  );
};

export default PasswordModal;

