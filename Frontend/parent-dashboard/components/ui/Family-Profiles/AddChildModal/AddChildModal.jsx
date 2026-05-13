import { useState } from 'react';
import { X, ShieldCheck, User, Calendar, CheckCircle2, Smartphone } from 'lucide-react';
import './AddChildModal.css';

const AddChildModal = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    deviceName: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setFormData({ name: '', age: '', deviceName: '', gender: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your child\'s full name';
    if (!formData.deviceName.trim()) newErrors.deviceName = 'Please give this device a recognizable name';
    if (!formData.age) newErrors.age = 'Child\'s age is required';
    else if (formData.age < 2 || formData.age > 13) newErrors.age = 'Age must be between 2 and 13 years';
    if (!formData.gender) newErrors.gender = 'Please select a gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onConfirm(formData);
      setFormData({ name: '', age: '', deviceName: '', gender: '' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-title">
            <div className="success-icon-bg">
              <ShieldCheck className="modal-top-icon" />
            </div>
            <div>
              <h2 className="modal-title">Device Connected!</h2>
              <p className="modal-subtitle">Complete the profile to start protecting</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="input-field-group">
              <label className="modal-label">
                <User size={14} />
                <span>Child's Full Name <span className="required-star">*</span></span>
              </label>
              <div className={`input-wrapper ${errors.name ? 'error' : ''}`}>
                <input
                  type="text"
                  placeholder="e.g. Sarah Ahmed"
                  value={formData.name}
                  onChange={(e) => {
                    const capitalizedValue = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                    setFormData({ ...formData, name: capitalizedValue });
                  }}
                  className="modal-input"
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="input-field-group flex-1">
                <label className="modal-label">
                  <Smartphone size={14} />
                  <span>Device Name <span className="required-star">*</span></span>
                </label>
                <div className={`input-wrapper ${errors.deviceName ? 'error' : ''}`}>
                  <input
                    type="text"
                    placeholder="e.g. Sarah's iPhone"
                    value={formData.deviceName}
                    onChange={(e) => {
                      const capitalizedValue = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                      setFormData({ ...formData, deviceName: capitalizedValue });
                    }}
                    className="modal-input"
                  />
                </div>
                {errors.deviceName && <span className="error-message">{errors.deviceName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="input-field-group age-input">
                <label className="modal-label">
                  <Calendar size={14} />
                  <span>Age <span className="required-star">*</span></span>
                </label>
                <div className={`input-wrapper ${errors.age ? 'error' : ''}`}>
                  <select
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="modal-input modal-select"
                  >
                    <option value="" disabled>Select</option>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((age) => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                </div>
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>

              <div className="input-field-group flex-1">
                <label className="modal-label">
                  <User size={14} />
                  <span>Gender <span className="required-star">*</span></span>
                </label>
                <div className={`input-wrapper ${errors.gender ? 'error' : ''}`}>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="modal-input modal-select"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Boy</option>
                    <option value="female">Girl</option>
                  </select>
                </div>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>

            <div className="info-notice">
              <CheckCircle2 size={16} color="var(--success)" />
              <span>This device will now follow AI-Guardian protection rules.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn-confirm">
              Confirm & Add Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;
