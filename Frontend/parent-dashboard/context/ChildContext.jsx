import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { STORAGE_KEYS } from '../utils/storageKeys';


// CONTEXT
export const ChildContext = createContext();

// PROVIDER
export const ChildProvider = ({ children }) => {

  // CHILDREN STATE

  const [childrenList, setChildrenList] = useState(() => {
    const savedChildren = localStorage.getItem(STORAGE_KEYS.CHILDREN);

    return savedChildren ? JSON.parse(savedChildren) : [];
  });


  // ACTIVE CHILD

  const [activeChildId, setActiveChildId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CHILD_ID) || null;
  });


  // PENDING REQUESTS

  const [pendingRequests, setPendingRequests] = useState(() => {
    const savedRequests = localStorage.getItem(
      STORAGE_KEYS.PENDING_REQUESTS
    );

    return savedRequests ? JSON.parse(savedRequests) : {};
  });


  // SAVE CHILDREN

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.CHILDREN,
      JSON.stringify(childrenList)
    );
  }, [childrenList]);

  // SAVE ACTIVE CHILD

  useEffect(() => {
    if (activeChildId) {
      localStorage.setItem(
        STORAGE_KEYS.ACTIVE_CHILD_ID,
        activeChildId
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_CHILD_ID);
    }
  }, [activeChildId]);


  // SAVE PENDING REQUESTS

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PENDING_REQUESTS,
      JSON.stringify(pendingRequests)
    );
  }, [pendingRequests]);


  // ADD CHILD

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

    // automatically switch to newly added child
    setActiveChildId(newChild.id);

    return newChild;
  };


  // REMOVE CHILD

  const removeChild = id => {
    setChildrenList(prev => {
      const updatedChildren = prev.filter(
        child => child.id !== id
      );

      // if removed child was active
      if (activeChildId === id) {
        setActiveChildId(updatedChildren[0]?.id || null);
      }

      return updatedChildren;
    });

    // also remove pending requests
    setPendingRequests(prev => {
      const updatedRequests = { ...prev };

      delete updatedRequests[id];

      return updatedRequests;
    });
  };


  // UPDATE CHILD

  const updateChild = (id, updatedData) => {
    setChildrenList(prev =>
      prev.map(child =>
        child.id === id
          ? {
            ...child,
            ...updatedData,
          }
          : child
      )
    );
  };


  // SET ACTIVE CHILD

  const setActiveChild = id => {
    const childExists = childrenList.some(
      child => child.id === id
    );

    if (childExists) {
      setActiveChildId(id);
    }
  };


  // GET ACTIVE CHILD

  const getActiveChild = () => {
    return (
      childrenList.find(
        child => child.id === activeChildId
      ) || null
    );
  };


  // ADD PENDING REQUEST

  const addPendingRequest = (
    childId,
    requestId,
    type = 'logout'
  ) => {
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


  // APPROVE REQUEST

  const approveRequest = (
    childId,
    requestId
  ) => {
    setPendingRequests(prev => ({
      ...prev,

      [childId]:
        prev[childId]?.filter(
          request => request.id !== requestId
        ) || [],
    }));
  };


  // DENY REQUEST

  const denyRequest = (
    childId,
    requestId
  ) => {
    setPendingRequests(prev => ({
      ...prev,

      [childId]:
        prev[childId]?.filter(
          request => request.id !== requestId
        ) || [],
    }));
  };


  // GET ACTIVE CHILD REQUESTS

  const getPendingRequestsForActiveChild =
    () => {
      return (
        pendingRequests[activeChildId] || []
      );
    };


  // CONTEXT VALUE

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