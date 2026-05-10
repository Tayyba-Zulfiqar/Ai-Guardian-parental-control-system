import { useState } from 'react';
import { User, Camera, Check, X, CheckCircle2, Lock } from 'lucide-react';
import './ProfileSection.css';

const ProfileSection = ({ profile, onUpdate, onChangePassword }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempEmail, setTempEmail] = useState(profile.email);

  const handleSaveName = () => {
    onUpdate({ name: tempName });
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    onUpdate({ email: tempEmail });
    setIsEditingEmail(false);
  };

  return (
    <section className="account-section">
      <div className="section-header">
        <User size={20} className="section-icon" />
        <h2>Profile Settings</h2>
      </div>
      <div className="card profile-card">
        <div className="avatar-section">
          <div className="avatar-container">
            <img src={profile.avatar} alt="Profile" className="profile-avatar" />
            <button className="upload-btn" title="Change Avatar">
              <Camera size={16} />
            </button>
          </div>
          <div className="avatar-info">
            <h3>Profile Picture</h3>
            <p>JPG or PNG. Max size of 800K</p>
          </div>
        </div>

        <div className="profile-fields">
          <div className="field-group">
            <label>Full Name</label>
            {isEditingName ? (
              <div className="edit-field">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                />
                <div className="field-actions">
                  <button className="btn-save" onClick={handleSaveName}><Check size={16} /></button>
                  <button className="btn-cancel" onClick={() => { setIsEditingName(false); setTempName(profile.name); }}><X size={16} /></button>
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
              <div className="edit-field">
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  autoFocus
                />
                <div className="field-actions">
                  <button className="btn-save" onClick={handleSaveEmail}><Check size={16} /></button>
                  <button className="btn-cancel" onClick={() => { setIsEditingEmail(false); setTempEmail(profile.email); }}><X size={16} /></button>
                </div>
              </div>
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
    </section>
  );
};

export default ProfileSection;
