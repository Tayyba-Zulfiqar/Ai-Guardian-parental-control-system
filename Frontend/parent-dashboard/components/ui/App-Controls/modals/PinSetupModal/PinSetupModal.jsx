
import Modal from '../../../../common/Modal/Modal';
import SecurityPinModal from '../SecurityPinModal/SecurityPinModal';

const PinSetupModal = ({ isOpen, onClose, onSave, isPinSet }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isPinSet ? "Change Security PIN" : "Set Security PIN"}
      size="small"
    >
      <SecurityPinModal 
        onSave={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default PinSetupModal;
