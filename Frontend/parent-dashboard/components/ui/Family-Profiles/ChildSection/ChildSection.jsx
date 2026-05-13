import PairingCard from '../PairingCard/PairingCard';
import ChildList from '../ChildList/ChildList';

const ChildSection = ({
  pairingCode,
  expiryTime,
  cooldown,
  formattedChildren,
  handlers
}) => {
  const {
    handleRegenerateCode,
    handleSimulateConnect,
    handleRemoveChild,
    handleSwitchActiveChild
  } = handlers;

  return (
    <section className="dashboard-content">
      <div className="profile-section">
        <PairingCard
          pairingCode={pairingCode}
          expiryTime={expiryTime}
          onRegenerate={handleRegenerateCode}
          onSimulateConnect={handleSimulateConnect}
          cooldown={cooldown}
        />
      </div>

      <div className="profile-section">
        <ChildList 
          childrenList={formattedChildren} 
          onRemoveChild={handleRemoveChild}
          onSwitchChild={handleSwitchActiveChild}
        />
      </div>
    </section>
  );
};

export default ChildSection;
