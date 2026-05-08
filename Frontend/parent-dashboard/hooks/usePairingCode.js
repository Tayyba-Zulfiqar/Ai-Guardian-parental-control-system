import { useState, useEffect, useCallback, useRef } from 'react';
import { pairingData } from '../data/Child-Profile/profileData';
import { generatePairingCode } from '../utils/pairingUtils';
import { formatTime } from '../utils/timeUtils';

export const usePairingCode = () => {
  const [currentPairing, setCurrentPairing] = useState(pairingData);
  const [cooldown, setCooldown] = useState(0);
  const [expiryTimer, setExpiryTimer] = useState(600);
  const cooldownRef = useRef(cooldown);

  useEffect(() => {
    cooldownRef.current = cooldown;
  }, [cooldown]);

  const handleRegenerateCode = useCallback((force = false, newCooldown = 60) => {
    if (force !== true && cooldownRef.current > 0) return;

    setCurrentPairing((prev) => ({
      ...prev,
      code: generatePairingCode()
    }));
    setCooldown(newCooldown);
    setExpiryTimer(600);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      setExpiryTimer((prev) => {
        if (prev <= 1) {
          handleRegenerateCode(true);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleRegenerateCode]);

  return {
    pairingCode: currentPairing.code,
    expiryTime: formatTime(expiryTimer),
    cooldown,
    handleRegenerateCode
  };
};
