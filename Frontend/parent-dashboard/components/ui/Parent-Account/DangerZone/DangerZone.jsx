import { AlertTriangle, Trash2 } from 'lucide-react';
import './DangerZone.css';

const DangerZone = ({ onDeleteAccount }) => {
  return (
    <section className="account-section danger-zone">
      <div className="section-header">
        <AlertTriangle size={20} className="section-icon red" />
        <h2 className="red">Danger Zone</h2>
      </div>
      <div className="card danger-card">
        <div className="danger-info">
          <h3>Delete Account</h3>
          <p>This action is permanent and cannot be undone. All data will be wiped.</p>
        </div>
        <button 
          className="btn-danger-outline"
          onClick={onDeleteAccount}
        >
          <Trash2 size={16} />
          Delete My Account
        </button>
      </div>
    </section>
  );
};

export default DangerZone;
