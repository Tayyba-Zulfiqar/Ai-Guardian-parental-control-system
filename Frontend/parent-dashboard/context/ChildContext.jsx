import { createContext, useContext, useState, useEffect } from 'react';

const ChildContext = createContext();

export const useChild = () => useContext(ChildContext);

export const ChildProvider = ({ children }) => {
  const [childrenList, setChildrenList] = useState([]);
  const [activeChildId, setActiveChildId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedChildren = localStorage.getItem('ai_guardian_children');
    const storedActiveChildId = localStorage.getItem('ai_guardian_active_child');
    
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
    
    localStorage.setItem('ai_guardian_children', JSON.stringify(updatedChildren));
    localStorage.setItem('ai_guardian_active_child', newChild.id);
    
    return newChild;
  };

  const removeChild = (id) => {
    const updatedChildren = childrenList.filter(child => child.id !== id);
    setChildrenList(updatedChildren);
    localStorage.setItem('ai_guardian_children', JSON.stringify(updatedChildren));
    
    if (activeChildId === id) {
      const newActiveId = updatedChildren.length > 0 ? updatedChildren[0].id : null;
      setActiveChildId(newActiveId);
      if (newActiveId) {
        localStorage.setItem('ai_guardian_active_child', newActiveId);
      } else {
        localStorage.removeItem('ai_guardian_active_child');
      }
    }
  };

  const setActiveChild = (id) => {
    setActiveChildId(id);
    localStorage.setItem('ai_guardian_active_child', id);
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
