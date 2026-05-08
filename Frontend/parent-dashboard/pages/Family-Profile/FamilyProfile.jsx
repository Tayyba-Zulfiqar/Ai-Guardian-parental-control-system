import { useState } from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import PairingCard from '../../components/ui/Child-Profile/PairingCard';
import ChildList from '../../components/ui/Child-Profile/ChildList';
import AddChildModal from '../../components/ui/Child-Profile/AddChildModal';
import { childrenList } from '../../data/Family-Profiles/profileData';
import { usePairingCode } from '../../hooks/usePairingCode';
import './FamilyProfile.css';

const FamilyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localChildren, setLocalChildren] = useState(childrenList);
  const [showToast, setShowToast] = useState(false);

  const {
    pairingCode,
    expiryTime,
    cooldown,
    handleRegenerateCode
  } = usePairingCode();

  const handleSimulateConnect = () => {
    // This simulates the 'pairing success' event from the child app
    setIsModalOpen(true);
  };

  const handleConfirmAddChild = (childInfo) => {
    const newChild = {
      id: Date.now(),
      name: childInfo.name,
      age: childInfo.age,
      device: childInfo.deviceName,
      deviceType: Smartphone,
      status: "Online",
      lastActive: "Just now",
      avatar: childInfo.gender === 'male' ? "👦" : "👧"
    };

    setLocalChildren((prev) => [...prev, newChild]);
    setIsModalOpen(false);

    // Show success feedback
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Force regenerate the code for the next child and reset the regeneration option (cooldown = 0)
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
          <ChildList children={localChildren} />
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