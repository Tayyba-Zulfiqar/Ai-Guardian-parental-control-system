
import { useState } from 'react';

const useAppToasts = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const closeToast = () => setToast(null);

  return { toast, showToast, closeToast };
};

export default useAppToasts;
