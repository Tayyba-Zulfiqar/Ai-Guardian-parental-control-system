
import { useState } from 'react';

const useModalState = () => {
  const [isConfirmToggleModalOpen, setIsConfirmToggleModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isPinRecommendationModalOpen, setIsPinRecommendationModalOpen] = useState(false);
  const [isFinalConfirmModalOpen, setIsFinalConfirmModalOpen] = useState(false);

  const closeAll = () => {
    setIsConfirmToggleModalOpen(false);
    setIsPinModalOpen(false);
    setIsVerifyModalOpen(false);
    setIsPinRecommendationModalOpen(false);
    setIsFinalConfirmModalOpen(false);
  };

  const openVerificationSequence = (isPinSet) => {
    if (isPinSet) {
      setIsVerifyModalOpen(true);
    } else {
      setIsPinRecommendationModalOpen(true);
    }
  };

  return {
    isConfirmToggleModalOpen,
    isPinModalOpen,
    isVerifyModalOpen,
    isPinRecommendationModalOpen,
    isFinalConfirmModalOpen,
    setIsConfirmToggleModalOpen,
    setIsPinModalOpen,
    setIsVerifyModalOpen,
    setIsPinRecommendationModalOpen,
    setIsFinalConfirmModalOpen,
    closeAll,
    openVerificationSequence
  };
};

export default useModalState;
