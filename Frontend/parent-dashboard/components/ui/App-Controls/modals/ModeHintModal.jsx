
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';

const ModeHintModal = ({ isOpen, onClose, selectedModeName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${selectedModeName} Mode Selected`}
      size="small"
      footer={
        <Button variant="primary" onClick={onClose}>Got it!</Button>
      }
    >
      <div className="scroll-hint-content">
        <div className="scroll-icon-wrapper">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
        <p>Please <strong>scroll down</strong> to configure the specific rules and actions for <strong>{selectedModeName} Mode</strong>.</p>
      </div>
    </Modal>
  );
};

export default ModeHintModal;
