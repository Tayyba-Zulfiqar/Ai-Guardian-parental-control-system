import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div 
      className={`toast ${type}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <div className="toast-content">
        {type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
        <span>{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}><X size={14} /></button>
    </motion.div>
  );
};

export default Toast;
