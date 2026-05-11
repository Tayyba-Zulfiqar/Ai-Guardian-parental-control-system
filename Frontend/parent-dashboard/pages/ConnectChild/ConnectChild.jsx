import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import PairingCard from '../../components/ui/Family-Profiles/PairingCard';
import AddChildModal from '../../components/ui/Family-Profiles/AddChildModal';
import { usePairingCode } from '../../hooks/usePairingCode';
import { useChild } from '../../context/ChildContext';
import { useAuth } from '../../context/AuthContext';
import '../Login/Login.css'; // Reuse full screen auth styles

const ConnectChild = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { addChild } = useChild();
  const { connectChild } = useAuth();

  const {
    pairingCode,
    expiryTime,
    cooldown,
    handleRegenerateCode
  } = usePairingCode();

  const handleSimulateConnect = () => {
    setIsModalOpen(true);
  };

  const handleConfirmAddChild = (childInfo) => {
    addChild(childInfo.name || "Child Name");
    connectChild(); // Mark onboarding as complete in AuthContext
    setIsModalOpen(false);
    setShowToast(true);

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      setShowToast(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-page">
      {showToast && (
        <div className="success-toast" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, background: 'var(--success)', color: 'white', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>Child profile added successfully!</span>
        </div>
      )}

      <div style={{ margin: 'auto', width: '100%', maxWidth: '1000px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ color: 'var(--sidebar-bg)', fontSize: '2.5rem', marginBottom: '12px' }}>Welcome to AI Guardian</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Let's connect your child's device to start monitoring.</p>
        </div>

        <PairingCard
          pairingCode={pairingCode}
          expiryTime={expiryTime}
          onRegenerate={handleRegenerateCode}
          onSimulateConnect={handleSimulateConnect}
          cooldown={cooldown}
        />
      </div>

      <AddChildModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddChild}
      />
    </div>
  );
};

export default ConnectChild;

