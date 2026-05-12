import './ChildStatusCard.css';

const ChildStatusCard = ({ child }) => {
  // Destructure with fallbacks to avoid crashes
  const {
    name = "Child",
    age = "--",
    status = "Unknown",
    lastActive = "Not seen recently"
  } = child || {};

  const isOnline = status.toLowerCase() === 'online' || status.toLowerCase() === 'currently active';

  return (
    <div className="child-status-card">
      <div className="card-header">
        <span className="label-text">Connected Child</span>
      </div>

      <div className="card-content">
        <div className="child-info">
          <h2 className="child-name">{name}</h2>
          <p className="child-age">{age} years old</p>
        </div>

        <div className="status-container">
          <div className="status-badge-wrapper">
            <span className={`status-badge ${isOnline ? 'online' : 'offline'}`}>
              {status}
            </span>
          </div>
          <div className="last-seen-info">
            <span className="last-seen-text">{lastActive}</span>
            <div className={`status-dot ${isOnline ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildStatusCard;
