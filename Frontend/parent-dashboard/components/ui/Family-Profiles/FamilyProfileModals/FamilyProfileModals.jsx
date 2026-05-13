import AddChildModal from '../AddChildModal/AddChildModal';
import SwitchChildModal from '../SwitchChildModal/SwitchChildModal';
import Modal from '../../common/Modal/Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';

const FamilyProfileModals = ({
  modals,
  handlers,
  formattedChildren,
  activeChildId,
  removedChildName
}) => {
  const {
    isModalOpen,
    setIsModalOpen,
    isSwitchModalOpen,
    setIsSwitchModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen
  } = modals;

  const {
    handleConfirmAddChild,
    handleConfirmSwitch,
    handleConfirmDelete
  } = handlers;

  return (
    <>
      <AddChildModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddChild}
      />

      <SwitchChildModal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        children={formattedChildren}
        activeChildId={activeChildId}
        onConfirm={handleConfirmSwitch}
      />

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Removal"
        size="small"
        footer={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', width: '100%' }}>
            <button className="btn-secondary" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
            <button 
              className="btn-primary-pro" 
              style={{ background: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={handleConfirmDelete}
            >
              <Trash2 size={16} />
              Remove Child
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '12px', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>Are you sure you want to remove this child?</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              This action cannot be undone. All monitoring data and history for <strong>{removedChildName}</strong> will be permanently deleted.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FamilyProfileModals;
