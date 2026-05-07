import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import PairingCard from '../../components/ui/Child-Profile/PairingCard';
import ChildList from '../../components/ui/Child-Profile/ChildList';
import AddChildModal from '../../components/ui/Child-Profile/AddChildModal';
import { childrenList } from '../../data/Child-Profile/profileData';
import { usePairingCode } from '../../hooks/usePairingCode';
import './ChildProfile.css';

const ChildProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localChildren, setLocalChildren] = useState(childrenList);
  
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
      avatar: "🆕"
    };

    setLocalChildren([...localChildren, newChild]);
    setIsModalOpen(false);
    // Force regenerate the code for the next child
    handleRegenerateCode(true);
  };

  return (
    <div className="dashboard-page child-profile-page">
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

export default ChildProfile;


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