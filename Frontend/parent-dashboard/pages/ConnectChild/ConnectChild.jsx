import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';

import PairingCard from '../../components/ui/Family-Profiles/PairingCard';
import AddChildModal from '../../components/ui/Family-Profiles/AddChildModal';

import { usePairingCode } from '../../hooks/usePairingCode';
import { useChild } from '../../context/ChildContext';

import '../Login/Login.css';

const ConnectChild = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();
  const { addChild, childrenList } = useChild();

  const {
    pairingCode,
    expiryTime,
    cooldown,
    handleRegenerateCode
  } = usePairingCode();

  // ======================
  // OPEN MODAL
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
  // ADD CHILD (FIXED FLOW)
  // ======================
  const handleConfirmAddChild = (childInfo) => {

    if (!childInfo?.name) return;

    // 1. Add child to context (SOURCE OF TRUTH)
    addChild(childInfo.name, childInfo.deviceType || 'Mobile');

    // 2. Show success UI
    setIsModalOpen(false);
    setShowToast(true);

    // 3. Refresh pairing code system
    handleRegenerateCode(true, 0);

    // 4. Redirect to dashboard
    setTimeout(() => {
      setShowToast(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="auth-page">

      {/* SUCCESS TOAST */}
      {showToast && (
        <div
          className="success-toast"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'var(--success)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>Child profile added successfully!</span>
        </div>
      )}

      {/* ERROR TOAST */}
      {showErrorToast && (
        <div
          className="success-toast"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'var(--danger, #ef4444)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={18} color="white" />
          <span>Maximum limit of 3 children reached!</span>
        </div>
      )}

      {/* HEADER */}
      <div
        style={{
          margin: 'auto',
          width: '100%',
          maxWidth: '1000px',
          padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              color: 'var(--sidebar-bg)',
              fontSize: '2.5rem',
              marginBottom: '12px',
            }}
          >
            Welcome to AI Guardian
          </h1>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
            }}
          >
            Let's connect your child's device to start monitoring.
          </p>
        </div>

        {/* PAIRING CARD */}
        <PairingCard
          pairingCode={pairingCode}
          expiryTime={expiryTime}
          onRegenerate={handleRegenerateCode}
          onSimulateConnect={handleSimulateConnect}
          cooldown={cooldown}
        />
      </div>

      {/* MODAL */}
      <AddChildModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddChild}
      />

    </div>
  );
};

export default ConnectChild;