import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../../src/validations/auth/loginSchema';
import { User, Check, X, CheckCircle2, Lock } from 'lucide-react';
import AvatarUpload from './AvatarUpload/AvatarUpload';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import { capitalizeWords } from '../../../../utils/stringUtils';
import './ProfileSection.css';

const emailSchema = loginSchema.pick({ email: true });

const ProfileSection = ({ profile, onUpdate, onChangePassword }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  
  const [pendingEmail, setPendingEmail] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: {
      email: profile.email
    }
  });

  // Sync temp states when profile changes (e.g. when auth user loads)
  useEffect(() => {
    if (!isEditingName) setTempName(profile.name);
  }, [profile.name, isEditingName]);

  useEffect(() => {
    if (!isEditingEmail) reset({ email: profile.email });
  }, [profile.email, isEditingEmail, reset]);

  const handleSaveName = () => {
    if (tempName.trim() === '') return;
    onUpdate({ name: tempName });
    setIsEditingName(false);
  };

  const onEmailSubmit = (data) => {
    if (data.email !== profile.email) {
      setPendingEmail(data.email);
      setShowConfirmModal(true);
    } else {
      setIsEditingEmail(false);
    }
  };

  const confirmEmailUpdate = () => {
    onUpdate({ email: pendingEmail });
    setIsEditingEmail(false);
    setShowConfirmModal(false);
    setPendingEmail(null);
  };

  const cancelEmailUpdate = () => {
    setShowConfirmModal(false);
    setPendingEmail(null);
    // Optional: we can also reset the form or exit edit mode
    // setIsEditingEmail(false);
    // reset({ email: profile.email });
  };

  return (
    <section className="account-section">
      <div className="section-header">
        <User size={20} className="section-icon" />
        <h2>Profile Settings</h2>
      </div>
      <div className="card profile-card">
        <AvatarUpload avatar={profile.avatar} onUpdate={onUpdate} />

        <div className="profile-fields">
          <div className="field-group">
            <label>Full Name</label>
            {isEditingName ? (
              <div className="edit-field">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(capitalizeWords(e.target.value))}
                  autoFocus
                />
                <div className="field-actions">
                  <button className="btn-save" onClick={handleSaveName}><Check size={20} strokeWidth={3} /></button>
                  <button className="btn-cancel" onClick={() => { setIsEditingName(false); setTempName(profile.name); }}><X size={20} strokeWidth={3} /></button>
                </div>
              </div>
            ) : (
              <div className="display-field" onClick={() => setIsEditingName(true)}>
                <span>{profile.name}</span>
                <button className="btn-edit">Edit</button>
              </div>
            )}
          </div>

          <div className="field-group">
            <label>Email Address</label>
            {isEditingEmail ? (
              <form 
                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} 
                onSubmit={handleSubmit(onEmailSubmit)}
              >
                <div className="edit-field">
                  <input
                    type="email"
                    {...register('email')}
                    autoFocus
                    className={errors.email ? 'error-input' : ''}
                    style={{ borderColor: errors.email ? 'var(--danger)' : undefined }}
                  />
                  <div className="field-actions">
                    <button type="submit" className="btn-save" disabled={!isValid} style={{ opacity: !isValid ? 0.5 : 1 }}>
                      <Check size={20} strokeWidth={3} />
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => { setIsEditingEmail(false); reset({ email: profile.email }); }}>
                      <X size={20} strokeWidth={3} />
                    </button>
                  </div>
                </div>
                {errors.email && <span className="error-text" style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{errors.email.message}</span>}
              </form>
            ) : (
              <div className="display-field" onClick={() => setIsEditingEmail(true)}>
                <div className="email-with-badge">
                  <span>{profile.email}</span>
                  {profile.isVerified && (
                    <span className="verification-badge">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  )}
                </div>
                <button className="btn-edit">Edit</button>
              </div>
            )}
          </div>

          <button
            className="btn-outline-primary change-pw-btn"
            onClick={onChangePassword}
          >
            <Lock size={16} />
            Change Password
          </button>
        </div>
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={cancelEmailUpdate}
        title="Confirm Email Update"
        size="small"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
          <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
            Are you sure you want to update your email to <strong>{pendingEmail}</strong>? This will be your new login email.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={cancelEmailUpdate}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmEmailUpdate}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ProfileSection;
