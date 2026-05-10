
import { ShieldAlert } from 'lucide-react';
import Modal from '../../../../common/Modal/Modal';
import Button from '../../../../common/Button/Button';
import './PinRecommendationModal.css';

const PinRecommendationModal = ({ 
  isOpen, 
  onClose, 
  onSkip, 
  onSetup,
  title = "Security PIN Recommended",
  description = "You haven't set a Security PIN yet. Without a PIN, anyone can disable monitoring.",
  skipText = "Skip & Pause",
  setupText = "Set Up PIN Now"
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      footer={
        <>
          <Button variant="secondary" onClick={onSkip}>{skipText}</Button>
          <Button variant="primary" onClick={onSetup}>{setupText}</Button>
        </>
      }
    >
      <div className="pin-recommendation-content">
        <div className="recommendation-icon-wrapper">
          <ShieldAlert size={48} />
        </div>
        <div className="recommendation-text">
          <p className="main-warning">
            <span role="img" aria-label="lock">🔒</span> {description.split('.')[0]}.
          </p>
          <p className="sub-warning">
            {description.split('.')[1]}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PinRecommendationModal;
