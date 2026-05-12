import { useState } from 'react';

import { Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';

import { useChild } from '../../context/ChildContext';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import AccountSwitcher from '../../components/ui/dashboard/AccountSwitcher/AccountSwitcher';
import PairingCard from '../../components/ui/Family-Profiles/PairingCard';
import ChildList from '../../components/ui/Family-Profiles/ChildList';
import AddChildModal from '../../components/ui/Family-Profiles/AddChildModal';
import SwitchChildModal from '../../components/ui/Family-Profiles/SwitchChildModal';
import Modal from '../../components/common/Modal/Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';

import { usePairingCode } from '../../hooks/usePairingCode';

import './FamilyProfile.css';

const FamilyProfile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showMinChildError, setShowMinChildError] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [childIdToRemove, setChildIdToRemove] = useState(null);
  const [showRemovalToast, setShowRemovalToast] = useState(false);
  const [removedChildName, setRemovedChildName] = useState('');
  const [newActiveChildName, setNewActiveChildName] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [childIdToConfirm, setChildIdToConfirm] = useState(null);

  const {
    childrenList,
    addChild,
    removeChild,
    activeChildId,
    setActiveChild,
  } = useChild();

  const {
    pairingCode,
    expiryTime,
    cooldown,
    handleRegenerateCode
  } = usePairingCode();

  // ======================
  // FORMAT CHILDREN (ONLY CONTEXT DATA)
  // ======================
  const formattedChildren = childrenList.map((child) => ({
    id: child.id,
    name: child.name,
    age: child.profile?.age || 'N/A',
    gender: child.gender || 'Not specified',
    device: child.deviceType,
    deviceType: Smartphone,
    status: child.id === activeChildId ? 'Currently Active' : 'Not Active',
    avatar: child.profile?.avatar || '🧒',
  }));

  // ======================
  // SIMULATE CONNECT
  // ======================
  const handleSimulateConnect = () => {
    if (childrenList.length >= 3) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      return;
    }
    setIsModalOpen(true);
  };

  // ======================
  // ADD CHILD (FIXED)
  // ======================
  const handleConfirmAddChild = (childInfo) => {

    addChild(
      childInfo.name,
      childInfo.deviceName,
      childInfo.age,
      childInfo.gender
    );

    setIsModalOpen(false);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);

    handleRegenerateCode(true, 0);
  };

  // ======================
  // REMOVE CHILD
  // ======================
  const handleRemoveChild = (id) => {
    if (childrenList.length <= 1) {
      setShowMinChildError(true);
      setTimeout(() => setShowMinChildError(false), 3000);
      return;
    }

    const child = childrenList.find(c => c.id === id);
    if (child) setRemovedChildName(child.name);

    // If there are exactly 2 children, show confirmation modal
    if (childrenList.length === 2) {
      setChildIdToConfirm(id);
      setIsConfirmModalOpen(true);
      return;
    }

    // Special case: Removing active child when there are 3 children
    // (Meaning 2 will remain, so user needs to pick which one becomes active)
    if (childrenList.length === 3 && id === activeChildId) {
      setChildIdToRemove(id);
      setIsSwitchModalOpen(true);
      return;
    }

    // Capture who will be active
    const remaining = childrenList.filter(c => c.id !== id);
    if (id === activeChildId && remaining.length > 0) {
      setNewActiveChildName(remaining[0].name);
    } else {
      const currentActive = childrenList.find(c => c.id === activeChildId);
      if (currentActive) setNewActiveChildName(currentActive.name);
    }

    removeChild(id);
    setShowRemovalToast(true);
    setTimeout(() => setShowRemovalToast(false), 3000);
  };

  const handleConfirmDelete = () => {
    if (childIdToConfirm) {
      const remaining = childrenList.filter(c => c.id !== childIdToConfirm);
      if (childIdToConfirm === activeChildId && remaining.length > 0) {
        setNewActiveChildName(remaining[0].name);
      } else {
        const currentActive = childrenList.find(c => c.id === activeChildId);
        if (currentActive) setNewActiveChildName(currentActive.name);
      }

      removeChild(childIdToConfirm);
      setShowRemovalToast(true);
      setTimeout(() => setShowRemovalToast(false), 3000);
    }
    setIsConfirmModalOpen(false);
    setChildIdToConfirm(null);
  };

  const handleConfirmSwitch = (newActiveId) => {
    setActiveChild(newActiveId);
    
    const newActiveChild = childrenList.find(c => c.id === newActiveId);
    if (newActiveChild) setNewActiveChildName(newActiveChild.name);

    if (childIdToRemove) {
      const child = childrenList.find(c => c.id === childIdToRemove);
      if (child) setRemovedChildName(child.name);
      
      removeChild(childIdToRemove);
      setShowRemovalToast(true);
      setTimeout(() => setShowRemovalToast(false), 3000);
    }
    setIsSwitchModalOpen(false);
    setChildIdToRemove(null);
  };

  return (
    <div className="dashboard-page child-profile-page">

      {showToast && (
        <div className="success-toast">
          <CheckCircle2 size={18} />
          <span>Child profile added successfully!</span>
        </div>
      )}

      {showRemovalToast && (
        <div className="success-toast">
          <CheckCircle2 size={18} />
          <span>{removedChildName} removed successfully and switched to {newActiveChildName}</span>
        </div>
      )}

      {showErrorToast && (
        <div className="success-toast" style={{ background: 'var(--danger, #ef4444)', color: 'white', border: 'none' }}>
          <AlertCircle size={18} color="white" />
          <span>Maximum limit of 3 children reached!</span>
        </div>
      )}

      {showMinChildError && (
        <div className="success-toast" style={{ background: 'var(--danger, #ef4444)', color: 'white', border: 'none' }}>
          <AlertCircle size={18} color="white" />
          <span>Cannot remove: At least one child is required for proper functioning of app.</span>
        </div>
      )}

      <div className="page-header-row">
        <PageHeader
          title="Family Profiles"
          subtitle="Manage and link your children's devices here"
        />
        <AccountSwitcher />
      </div>

      <section className="dashboard-content">

        <div className="profile-section">

          <PairingCard
            pairingCode={pairingCode}
            expiryTime={expiryTime}
            onRegenerate={handleRegenerateCode}
            onSimulateConnect={handleSimulateConnect}
            cooldown={cooldown}
          />

        </div>

        <div className="profile-section">

          <ChildList 
            childrenList={formattedChildren} 
            onRemoveChild={handleRemoveChild}
          />

        </div>

      </section>

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

    </div>
  );
};

export default FamilyProfile;


//tIME BASED BEHAVIOR TRACKING

//use selectedChildId and change it using react context/redux
/*

1- ADD / LINK CHILD SECTION:
Generate unique pairing code / QR code
Pairing code expiry time
child name
child age
regrenate code option



2- ADDED CHILD LIST ALONG WITH:
Name / age
device info
status (online/offline/linked/not linked)
last active time
*/