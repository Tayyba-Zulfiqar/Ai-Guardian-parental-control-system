import './AlertAISummary.css';
import { ShieldCheck } from 'lucide-react';

const AlertAISummary = ({ summary }) => {
  return (
    <div className="alert-ai-summary">
      <div className="ai-summary-header">
        <ShieldCheck size={18} className="ai-icon" />
        <h4 className="ai-title">AI Summary</h4>
      </div>
      <p className="ai-text">{summary}</p>
    </div>
  );
};

export default AlertAISummary;
