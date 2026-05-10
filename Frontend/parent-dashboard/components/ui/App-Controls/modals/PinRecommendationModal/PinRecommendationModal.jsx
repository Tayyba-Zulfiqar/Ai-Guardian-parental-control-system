
import { ShieldAlert, Lock } from 'lucide-react';
import Modal from '../../../../common/Modal/Modal';
import Button from '../../../../common/Button/Button';
import './PinRecommendationModal.css';

const PinRecommendationModal = ({ isOpen, onClose, onSkip, onSetup }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Security PIN Recommended"
      size="small"
      footer={
        <>
          <Button variant="secondary" onClick={onSkip}>Skip & Pause</Button>
          <Button variant="primary" onClick={onSetup}>Set Up PIN Now</Button>
        </>
      }
    >
      <div className="pin-recommendation-content">
        <div className="recommendation-icon-wrapper">
          <ShieldAlert size={48} />
        </div>
        <div className="recommendation-text">
          <p className="main-warning">
            <span role="img" aria-label="lock">🔒</span> You haven't set a Security PIN yet.
          </p>
          <p className="sub-warning">
            Without a PIN, anyone with access to this device can disable monitoring.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PinRecommendationModal;
