import { useState } from 'react';

import { Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';

import { useChild } from '../../context/ChildContext';

import PageHeader from '../../components/common/PageHeader/PageHeader';
import PairingCard from '../../components/ui/Family-Profiles/PairingCard';
import ChildList from '../../components/ui/Family-Profiles/ChildList';
import AddChildModal from '../../components/ui/Family-Profiles/AddChildModal';

import { usePairingCode } from '../../hooks/usePairingCode';

import './FamilyProfile.css';

const FamilyProfile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const {
    childrenList,
    addChild,
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
    device: child.deviceType,
    deviceType: Smartphone,
    status: 'Online',
    lastActive: 'Just now',
    avatar: '👦',
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
      childInfo.deviceName
    );

    setIsModalOpen(false);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);

    handleRegenerateCode(true, 0);
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

      <PageHeader
        title="Family Profiles"
        subtitle="Manage and link your children's devices here"
      />

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

          <ChildList children={formattedChildren} />

        </div>

      </section>

      <AddChildModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddChild}
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