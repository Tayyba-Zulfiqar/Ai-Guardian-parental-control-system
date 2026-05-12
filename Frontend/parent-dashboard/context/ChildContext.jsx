import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { STORAGE_KEYS } from '../utils/storageKeys';
import { useAuth } from './AuthContext';

// CONTEXT
export const ChildContext = createContext();

// PROVIDER
export const ChildProvider = ({ children }) => {

  const { user } = useAuth();

  const [childrenList, setChildrenList] = useState([]);
  const [activeChildId, setActiveChildId] = useState(null);
  const [pendingRequests, setPendingRequests] = useState({});

  // ======================
  // LOAD DATA ONLY WHEN USER EXISTS
  // ======================
  useEffect(() => {

    // ❌ IMPORTANT: do nothing if not logged in
    if (!user) {
      setChildrenList([]);
      setActiveChildId(null);
      setPendingRequests({});
      return;
    }

    const savedChildren = localStorage.getItem(`${STORAGE_KEYS.CHILDREN}_${user.id}`);
    const savedActiveChild = localStorage.getItem(`${STORAGE_KEYS.ACTIVE_CHILD_ID}_${user.id}`);
    const savedRequests = localStorage.getItem(`${STORAGE_KEYS.PENDING_REQUESTS}_${user.id}`);

    setChildrenList(savedChildren ? JSON.parse(savedChildren) : []);
    setActiveChildId(savedActiveChild || null);
    setPendingRequests(savedRequests ? JSON.parse(savedRequests) : {});

  }, [user]);

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
  const addChild = (name, deviceType = 'Mobile') => {

    const newChild = {
      id: crypto.randomUUID(),
      name,
      deviceType,

      profile: {
        avatar: '',
        age: null,
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
    setActiveChildId(newChild.id);

    return newChild;
  };

  // ======================
  // REMOVE CHILD
  // ======================
  const removeChild = (id) => {

    setChildrenList(prev => {
      const updated = prev.filter(child => child.id !== id);

      if (activeChildId === id) {
        setActiveChildId(updated[0]?.id || null);
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

    addChild,
    removeChild,
    updateChild,

    setActiveChild,
    getActiveChild,

    addPendingRequest,
    approveRequest,
    denyRequest,

    getPendingRequestsForActiveChild,
  };

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
};

// CUSTOM HOOK
export const useChild = () => {
  return useContext(ChildContext);
};