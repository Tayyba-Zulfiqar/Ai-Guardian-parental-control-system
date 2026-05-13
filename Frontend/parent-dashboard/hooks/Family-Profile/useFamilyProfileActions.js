import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { useChild } from '../../context/ChildContext';
import { usePairingCode } from '../usePairingCode';

export const useFamilyProfileActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showMinChildError, setShowMinChildError] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [childIdToRemove, setChildIdToRemove] = useState(null);
  const [showRemovalToast, setShowRemovalToast] = useState(false);
  const [removedChildName, setRemovedChildName] = useState('');
  const [newActiveChildName, setNewActiveChildName] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [childIdToConfirm, setChildIdToConfirm] = useState(null);

  const {
    childrenList,
    addChild,
    removeChild,
    activeChildId,
    setActiveChild,
    requestSwitchChild,
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
    gender: child.gender || 'Not specified',
    device: child.deviceType,
    deviceType: Smartphone,
    status: child.id === activeChildId ? 'Currently Active' : 'Not Active',
    avatar: child.profile?.avatar || '🧒',
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
      childInfo.deviceName,
      childInfo.age,
      childInfo.gender
    );

    setIsModalOpen(false);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);

    handleRegenerateCode(true, 0);
  };

  // ======================
  // REMOVE CHILD
  // ======================
  const handleRemoveChild = (id) => {
    if (childrenList.length <= 1) {
      setShowMinChildError(true);
      setTimeout(() => setShowMinChildError(false), 3000);
      return;
    }

    const child = childrenList.find(c => c.id === id);
    if (child) setRemovedChildName(child.name);

    // Case 1: 3 children, removing active -> Show Switch Selector Modal (handles both switch and confirmation)
    if (childrenList.length === 3 && id === activeChildId) {
      setChildIdToRemove(id);
      setIsSwitchModalOpen(true);
      return;
    }

    // Case 2: All other removals -> Always show Confirmation Modal
    setChildIdToConfirm(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (childIdToConfirm) {
      const remaining = childrenList.filter(c => c.id !== childIdToConfirm);
      if (childIdToConfirm === activeChildId && remaining.length > 0) {
        setNewActiveChildName(remaining[0].name);
      } else {
        const currentActive = childrenList.find(c => c.id === activeChildId);
        if (currentActive) setNewActiveChildName(currentActive.name);
      }

      removeChild(childIdToConfirm);
      setShowRemovalToast(true);
      setTimeout(() => setShowRemovalToast(false), 3000);
    }
    setIsConfirmModalOpen(false);
    setChildIdToConfirm(null);
  };

  const handleConfirmSwitch = (newActiveId) => {
    const newActiveChild = childrenList.find(c => c.id === newActiveId);
    if (newActiveChild) setNewActiveChildName(newActiveChild.name);

    if (childIdToRemove) {
      const child = childrenList.find(c => c.id === childIdToRemove);
      if (child) setRemovedChildName(child.name);

      removeChild(childIdToRemove, newActiveId);
      setShowRemovalToast(true);
      setTimeout(() => setShowRemovalToast(false), 3000);
    }
    setIsSwitchModalOpen(false);
    setChildIdToRemove(null);
  };

  return {
    formattedChildren,
    pairingCode,
    expiryTime,
    cooldown,
    activeChildId,
    removedChildName,
    newActiveChildName,
    modals: {
      isModalOpen,
      setIsModalOpen,
      isSwitchModalOpen,
      setIsSwitchModalOpen,
      isConfirmModalOpen,
      setIsConfirmModalOpen
    },
    toasts: {
      showToast,
      showErrorToast,
      showMinChildError,
      showRemovalToast
    },
    handlers: {
      handleSimulateConnect,
      handleConfirmAddChild,
      handleRemoveChild,
      handleConfirmDelete,
      handleConfirmSwitch,
      handleRegenerateCode,
      handleSwitchActiveChild: requestSwitchChild
    }
  };
};
