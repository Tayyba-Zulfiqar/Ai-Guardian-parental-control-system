import { CheckCircle2, AlertCircle } from 'lucide-react';

const FamilyProfileToasts = ({ toasts, removedChildName, newActiveChildName }) => {
  const {
    showToast,
    showErrorToast,
    showMinChildError,
    showRemovalToast
  } = toasts;

  return (
    <>
      {showToast && (
        <div className="success-toast">
          <CheckCircle2 size={18} />
          <span>Child profile added successfully!</span>
        </div>
      )}

      {showRemovalToast && (
        <div className="success-toast">
          <CheckCircle2 size={18} />
          <span>{removedChildName} removed successfully and switched to {newActiveChildName}</span>
        </div>
      )}

      {showErrorToast && (
        <div className="success-toast" style={{ background: 'var(--danger, #ef4444)', color: 'white', border: 'none' }}>
          <AlertCircle size={18} color="white" />
          <span>Maximum limit of 3 children reached!</span>
        </div>
      )}

      {showMinChildError && (
        <div className="success-toast" style={{ background: 'var(--danger, #ef4444)', color: 'white', border: 'none' }}>
          <AlertCircle size={18} color="white" />
          <span>Cannot remove: At least one child is required for proper functioning of app.</span>
        </div>
      )}
    </>
  );
};

export default FamilyProfileToasts;
