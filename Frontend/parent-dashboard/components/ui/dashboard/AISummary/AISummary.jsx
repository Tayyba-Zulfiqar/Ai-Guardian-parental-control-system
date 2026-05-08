import { Sparkles } from 'lucide-react';
import './AISummary.css';

const AISummary = ({ child }) => {
  return (
    <div className="ai-summary-card">
      <div className="ai-summary-header">
        <Sparkles size={20} className="ai-icon" />
        <h3 className="ai-summary-title">Daily Behavior AI Insights</h3>
      </div>
      <p className="ai-summary-text">
        {child?.aiSummary || "No summary available for today."}
      </p>
    </div>
  );
};

export default AISummary;
