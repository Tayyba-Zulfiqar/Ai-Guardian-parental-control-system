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

    // If there are exactly 2 children, show confirmation modal
    if (childrenList.length === 2) {
      setChildIdToConfirm(id);
      setIsConfirmModalOpen(true);
      return;
    }

    // Special case: Removing active child when there are 3 children
    // (Meaning 2 will remain, so user needs to pick which one becomes active)
    if (childrenList.length === 3 && id === activeChildId) {
      setChildIdToRemove(id);
      setIsSwitchModalOpen(true);
      return;
    }

    // Capture who will be active
    const remaining = childrenList.filter(c => c.id !== id);
    if (id === activeChildId && remaining.length > 0) {
      setNewActiveChildName(remaining[0].name);
    } else {
      const currentActive = childrenList.find(c => c.id === activeChildId);
      if (currentActive) setNewActiveChildName(currentActive.name);
    }

    removeChild(id);
    setShowRemovalToast(true);
    setTimeout(() => setShowRemovalToast(false), 3000);
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
    setActiveChild(newActiveId);

    const newActiveChild = childrenList.find(c => c.id === newActiveId);
    if (newActiveChild) setNewActiveChildName(newActiveChild.name);

    if (childIdToRemove) {
      const child = childrenList.find(c => c.id === childIdToRemove);
      if (child) setRemovedChildName(child.name);

      removeChild(childIdToRemove);
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
      handleRegenerateCode
    }
  };
};
