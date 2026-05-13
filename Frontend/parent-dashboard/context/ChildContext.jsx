import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { STORAGE_KEYS } from '../utils/storageKeys';
import { useAuth } from './AuthContext';
import Modal from '../components/common/Modal/Modal';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

// CONTEXT
export const ChildContext = createContext();

// PROVIDER
export const ChildProvider = ({ children }) => {

  const { user, loading: authLoading } = useAuth();

  const [childrenList, setChildrenList] = useState([]);
  const [activeChildId, setActiveChildId] = useState(null);
  const [pendingRequests, setPendingRequests] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Switch Request State
  const [isSwitchConfirmOpen, setIsSwitchConfirmOpen] = useState(false);
  const [childIdToSwitch, setChildIdToSwitch] = useState(null);
  const [targetChildName, setTargetChildName] = useState('');
  const [showSwitchToast, setShowSwitchToast] = useState(false);

  // ======================
  // SWITCH CHILD LOGIC
  // ======================
  const requestSwitchChild = (id) => {
    const child = childrenList.find(c => c.id === id);
    if (child) {
      setTargetChildName(child.name);
      setChildIdToSwitch(id);
      setIsSwitchConfirmOpen(true);
    }
  };

  const confirmSwitchChild = () => {
    if (childIdToSwitch) {
      setActiveChildId(childIdToSwitch);
      setShowSwitchToast(true);
      setTimeout(() => setShowSwitchToast(false), 3000);
    }
    setIsSwitchConfirmOpen(false);
    setChildIdToSwitch(null);
  };

  const cancelSwitchChild = () => {
    setIsSwitchConfirmOpen(false);
    setChildIdToSwitch(null);
  };

  // ======================
  // LOAD DATA ONLY WHEN USER EXISTS
  // ======================
  useEffect(() => {

    // Wait for auth to finish hydrating before evaluating children
    if (authLoading) return;

    // ❌ IMPORTANT: do nothing if not logged in
    if (!user) {
      setChildrenList([]);
      setActiveChildId(null);
      setPendingRequests({});
      setIsLoading(false);
      return;
    }

    const savedChildren = localStorage.getItem(`${STORAGE_KEYS.CHILDREN}_${user.id}`);
    const savedActiveChild = localStorage.getItem(`${STORAGE_KEYS.ACTIVE_CHILD_ID}_${user.id}`);
    const savedRequests = localStorage.getItem(`${STORAGE_KEYS.PENDING_REQUESTS}_${user.id}`);

    setChildrenList(savedChildren ? JSON.parse(savedChildren) : []);
    setActiveChildId(savedActiveChild || null);
    setPendingRequests(savedRequests ? JSON.parse(savedRequests) : {});

    setIsLoading(false);

  }, [user, authLoading]);

  // ======================
  // SAVE CHILDREN (ONLY IF USER EXISTS)
  // ======================
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `${STORAGE_KEYS.CHILDREN}_${user.id}`,
      JSON.stringify(childrenList)
    );
  }, [childrenList, user]);

  // ======================
  // SAVE ACTIVE CHILD
  // ======================
  useEffect(() => {
    if (!user) return;

    if (activeChildId) {
      localStorage.setItem(
        `${STORAGE_KEYS.ACTIVE_CHILD_ID}_${user.id}`,
        activeChildId
      );
    } else {
      localStorage.removeItem(`${STORAGE_KEYS.ACTIVE_CHILD_ID}_${user.id}`);
    }
  }, [activeChildId, user]);

  // ======================
  // SAVE PENDING REQUESTS
  // ======================
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `${STORAGE_KEYS.PENDING_REQUESTS}_${user.id}`,
      JSON.stringify(pendingRequests)
    );
  }, [pendingRequests, user]);

  // ======================
  // ADD CHILD
  // ======================
  const addChild = (name, deviceType = 'Mobile', age = null, gender = null) => {
    const newChild = {
      id: crypto.randomUUID(),
      name,
      deviceType,
      gender,
      profile: {
        avatar: gender === 'male' ? '👦' : (gender === 'female' ? '👧' : '🧒'),
        age: age ? parseInt(age) : null,
      },

      monitoring: {
        enabled: true,
        logoutProtection: true,
        appBlocking: false,
      },

      stats: {
        screenTimeToday: 0,
        alertsCount: 0,
      },

      connectedAt: new Date().toISOString(),
    };

    setChildrenList(prev => [...prev, newChild]);
    
    // Only set as active if it's the first child being added
    if (childrenList.length === 0) {
      setActiveChildId(newChild.id);
    }

    return newChild;
  };

  // ======================
  // REMOVE CHILD
  // ======================
  const removeChild = (id, fallbackActiveId = null) => {

    setChildrenList(prev => {
      const updated = prev.filter(child => child.id !== id);

      if (activeChildId === id) {
        setActiveChildId(fallbackActiveId || updated[0]?.id || null);
      }

      return updated;
    });

    setPendingRequests(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // ======================
  // UPDATE CHILD
  // ======================
  const updateChild = (id, updatedData) => {
    setChildrenList(prev =>
      prev.map(child =>
        child.id === id ? { ...child, ...updatedData } : child
      )
    );
  };

  // ======================
  // SET ACTIVE CHILD
  // ======================
  const setActiveChild = (id) => {
    const exists = childrenList.some(child => child.id === id);
    if (exists) setActiveChildId(id);
  };

  // ======================
  // GET ACTIVE CHILD
  // ======================
  const getActiveChild = () => {
    return childrenList.find(c => c.id === activeChildId) || null;
  };

  // ======================
  // PENDING REQUESTS
  // ======================
  const addPendingRequest = (childId, requestId, type = 'logout') => {
    setPendingRequests(prev => ({
      ...prev,
      [childId]: [
        ...(prev[childId] || []),
        {
          id: requestId,
          type,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  };

  const approveRequest = (childId, requestId) => {
    setPendingRequests(prev => ({
      ...prev,
      [childId]:
        prev[childId]?.filter(r => r.id !== requestId) || [],
    }));
  };

  const denyRequest = (childId, requestId) => {
    setPendingRequests(prev => ({
      ...prev,
      [childId]:
        prev[childId]?.filter(r => r.id !== requestId) || [],
    }));
  };

  const getPendingRequestsForActiveChild = () => {
    return pendingRequests[activeChildId] || [];
  };

  // ======================
  // CONTEXT VALUE
  // ======================
  const value = {
    childrenList,
    activeChildId,
    pendingRequests,
    isLoading,

    addChild,
    removeChild,
    updateChild,

    setActiveChild,
    getActiveChild,

    addPendingRequest,
    approveRequest,
    denyRequest,

    getPendingRequestsForActiveChild,
    requestSwitchChild,
  };

  return (
    <ChildContext.Provider value={value}>
      {children}
      
      {/* Global Switch Confirmation Modal */}
      <Modal
        isOpen={isSwitchConfirmOpen}
        onClose={cancelSwitchChild}
        title="Confirm Switch"
        size="small"
        footer={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', width: '100%' }}>
            <button className="btn-secondary" onClick={cancelSwitchChild}>Cancel</button>
            <button 
              className="btn-primary-pro" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#3b82f6' }}
              onClick={confirmSwitchChild}
            >
              Confirm Switch
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '12px', color: '#3b82f6' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>Switch active profile?</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              You are about to switch the active monitoring profile to <strong>{targetChildName}</strong>.
            </p>
          </div>
        </div>
      </Modal>

      {/* Global Switch Success Toast */}
      {showSwitchToast && (
        <div className="success-toast" style={{
          position: 'fixed', top: '2rem', right: '2rem', background: '#ecfdf5', color: '#065f46', 
          padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', 
          gap: '0.8rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', zIndex: 10000, 
          border: '1px solid #d1fae5', fontWeight: 600, animation: 'slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <CheckCircle2 size={18} />
          <span>Switched to {targetChildName} successfully!</span>
        </div>
      )}
    </ChildContext.Provider>
  );
};

// CUSTOM HOOK
export const useChild = () => {
  return useContext(ChildContext);
};