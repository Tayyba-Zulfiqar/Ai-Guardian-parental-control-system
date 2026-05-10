
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';

const ConfirmPauseModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pause Monitoring?"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Yes, Pause Monitoring</Button>
        </>
      }
    >
      <div className="confirmation-modal-content">
        <p>Disabling monitoring will stop tracking all child activity across all devices. Are you sure you want to proceed?</p>
      </div>
    </Modal>
  );
};

export default ConfirmPauseModal;
