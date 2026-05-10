
import { useState } from 'react';

const usePinManagement = () => {
  const [isPinSet, setIsPinSet] = useState(false);
  const [storedPin, setStoredPin] = useState('');
  const [lastChangedDate, setLastChangedDate] = useState('');

  const setPin = (newPin) => {
    setIsPinSet(true);
    setStoredPin(newPin);
    setLastChangedDate(new Date().toLocaleDateString());
  };

  const verifyPin = (pin) => pin === storedPin;

  const removePin = () => {
    setIsPinSet(false);
    setStoredPin('');
    setLastChangedDate('');
  };

  return { 
    isPinSet, 
    storedPin, 
    lastChangedDate, 
    setPin, 
    verifyPin, 
    removePin 
  };
};

export default usePinManagement;
