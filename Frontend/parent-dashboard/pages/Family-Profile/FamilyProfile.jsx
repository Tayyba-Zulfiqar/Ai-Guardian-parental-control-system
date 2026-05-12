import { useState } from 'react';

import { Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';

import { useChild } from '../../context/ChildContext';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import AccountSwitcher from '../../components/ui/dashboard/AccountSwitcher/AccountSwitcher';
import PairingCard from '../../components/ui/Family-Profiles/PairingCard';
import ChildList from '../../components/ui/Family-Profiles/ChildList';
import AddChildModal from '../../components/ui/Family-Profiles/AddChildModal';
import SwitchChildModal from '../../components/ui/Family-Profiles/SwitchChildModal';

import { usePairingCode } from '../../hooks/usePairingCode';

import './FamilyProfile.css';

const FamilyProfile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showMinChildError, setShowMinChildError] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [childIdToRemove, setChildIdToRemove] = useState(null);

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

    // Special case: Removing active child when there are 3 children
    // (Meaning 2 will remain, so user needs to pick which one becomes active)
    if (childrenList.length === 3 && id === activeChildId) {
      setChildIdToRemove(id);
      setIsSwitchModalOpen(true);
      return;
    }

    removeChild(id);
  };

  const handleConfirmSwitch = (newActiveId) => {
    setActiveChild(newActiveId);
    if (childIdToRemove) {
      removeChild(childIdToRemove);
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