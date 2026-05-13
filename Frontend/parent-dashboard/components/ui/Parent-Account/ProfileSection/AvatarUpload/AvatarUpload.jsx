import React, { useRef, useState } from 'react';
import { Camera, Check, X } from 'lucide-react';
import Modal from '../../../../common/Modal/Modal';
import Button from '../../../../common/Button/Button';
import './AvatarUpload.css';

const AvatarUpload = ({ avatar, onUpdate }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPG or PNG).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate file size (max 800KB)
    const maxSize = 800 * 1024;
    if (file.size > maxSize) {
      alert('File size exceeds 800KB. Please select a smaller image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setShowModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    onUpdate({ avatar: preview });
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="avatar-section">
      <div className="avatar-container">
        <img src={avatar} alt="Profile" className="profile-avatar" />
        <label htmlFor="avatar-input" className="upload-btn" title="Change Avatar">
          <Camera size={16} />
          <input
            id="avatar-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            hidden
          />
        </label>
      </div>
      <div className="avatar-info">
        <h3>Profile Picture</h3>
        <p>JPG or PNG. Max size of 800K</p>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleClose}
        title="Confirm New Profile Picture"
        size="small"
      >
        <div className="avatar-confirm-content">
          <div className="preview-container">
            <img src={preview} alt="New Preview" className="preview-image" />
          </div>
          <p>Do you want to set this as your new profile picture?</p>
          <div className="confirm-actions">
            <Button variant="outline" onClick={handleClose} icon={X}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm} icon={Check}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUpload;
