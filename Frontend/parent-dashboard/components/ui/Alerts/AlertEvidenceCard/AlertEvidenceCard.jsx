import './AlertEvidenceCard.css';
import { Image as ImageIcon } from 'lucide-react';

const AlertEvidenceCard = () => {
  return (
    <div className="alert-evidence-container">
      <h4 className="evidence-header-title">Screenshot Evidence</h4>
      <div className="screenshot-placeholder">
        <ImageIcon size={32} className="placeholder-icon" />
        <span>Screenshot evidence will be displayed here</span>
      </div>
    </div>
  );
};

export default AlertEvidenceCard;
