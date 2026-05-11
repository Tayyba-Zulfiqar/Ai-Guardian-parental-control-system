import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/storageKeys';

const ChildContext = createContext();

export const useChild = () => useContext(ChildContext);

export const ChildProvider = ({ children }) => {
  const [childrenList, setChildrenList] = useState([]);
  const [activeChildId, setActiveChildId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Refreshed, loading from storage (ChildContext)");
    
    const storedChildren = localStorage.getItem(STORAGE_KEYS.CHILDREN);
    console.log("Loaded (Children): " + storedChildren);
    
    const storedActiveChildId = localStorage.getItem(STORAGE_KEYS.ACTIVE_CHILD_ID);
    console.log("Loaded (Active Child ID): " + storedActiveChildId);
    
    if (storedChildren) {
      setChildrenList(JSON.parse(storedChildren));
    }
    
    if (storedActiveChildId) {
      setActiveChildId(storedActiveChildId);
    }
    setLoading(false);
  }, []);

  const addChild = (name) => {
    const newChild = {
      id: `child_${Date.now()}`,
      name: name,
      connectedAt: new Date().toISOString(),
    };
    
    const updatedChildren = [...childrenList, newChild];
    setChildrenList(updatedChildren);
    setActiveChildId(newChild.id);
    
    const childrenToSave = JSON.stringify(updatedChildren);
    localStorage.setItem(STORAGE_KEYS.CHILDREN, childrenToSave);
    console.log("Saved (Children): " + childrenToSave);
    
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD_ID, newChild.id);
    console.log("Saved (Active Child ID): " + newChild.id);
    
    return newChild;
  };

  const removeChild = (id) => {
    const updatedChildren = childrenList.filter(child => child.id !== id);
    setChildrenList(updatedChildren);
    
    const childrenToSave = JSON.stringify(updatedChildren);
    localStorage.setItem(STORAGE_KEYS.CHILDREN, childrenToSave);
    console.log("Saved (Children after removal): " + childrenToSave);
    
    if (activeChildId === id) {
      const newActiveId = updatedChildren.length > 0 ? updatedChildren[0].id : null;
      setActiveChildId(newActiveId);
      if (newActiveId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD_ID, newActiveId);
        console.log("Saved (New Active Child ID after removal): " + newActiveId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_CHILD_ID);
        console.log("Removed (Active Child ID after last child removal)");
      }
    }
  };

  const setActiveChild = (id) => {
    setActiveChildId(id);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD_ID, id);
    console.log("Saved (Active Child ID switch): " + id);
  };

  const value = {
    childrenList,
    activeChildId,
    addChild,
    removeChild,
    setActiveChild,
    loading
  };

  return (
    <ChildContext.Provider value={value}>
      {!loading && children}
    </ChildContext.Provider>
  );
};

