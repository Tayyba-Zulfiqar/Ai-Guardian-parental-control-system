
import Modal from '../../../../common/Modal/Modal';
import SecurityPinModal from '../SecurityPinModal/SecurityPinModal';

const PinSetupModal = ({ isOpen, onClose, onSave, isPinSet, storedPin }) => {
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
        isPinSet={isPinSet}
        storedPin={storedPin}
      />
    </Modal>
  );
};

export default PinSetupModal;
