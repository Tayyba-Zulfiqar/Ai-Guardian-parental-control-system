import './ActivityInsights.css';
import { Sparkles, TrendingUp, AlertTriangle, Info } from 'lucide-react';

const iconMap = {
  warning: <TrendingUp size={20} className="insight-icon warning-icon" />,
  alert: <AlertTriangle size={20} className="insight-icon alert-icon" />,
  info: <Info size={20} className="insight-icon info-icon" />
};

const ActivityInsights = ({ data, childName = 'Child', gender = 'female' }) => {
  // Function to replace mock data "Emma" and pronouns with actual child data
  const formatInsight = (text) => {
    if (!text) return '';
    
    // 1. Replace "Emma's" and "Emma"
    let formattedText = text.replace(/Emma's/g, `${childName}'s`);
    formattedText = formattedText.replace(/Emma/g, childName);
    
    // 2. Handle Pronouns (if the mock data uses them)
    // We assume the mock data is about "Emma" (female)
    if (gender === 'male') {
      formattedText = formattedText.replace(/\bher\b/g, 'his');
      formattedText = formattedText.replace(/\bHer\b/g, 'His');
      formattedText = formattedText.replace(/\bshe\b/g, 'he');
      formattedText = formattedText.replace(/\bShe\b/g, 'He');
    } else if (gender !== 'female') {
      // Non-binary or unspecified
      formattedText = formattedText.replace(/\bher\b/g, 'their');
      formattedText = formattedText.replace(/\bHer\b/g, 'Their');
      formattedText = formattedText.replace(/\bshe\b/g, 'they');
      formattedText = formattedText.replace(/\bShe\b/g, 'They');
    }
    
    return formattedText;
  };

  return (
    <div className="activity-insights">
      <div className="insights-header">
        <div className="insights-title-wrapper">
          <Sparkles size={20} className="sparkles-icon" />
          <h3>Summary</h3>
        </div>
      </div>
      
      <div className="insights-list">
        {data.map((item) => (
          <div key={item.id} className={`insight-card ${item.type}`}>
            <div className="insight-icon-wrapper">
              {iconMap[item.type]}
            </div>
            <p className="insight-text">{formatInsight(item.insight)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityInsights;
