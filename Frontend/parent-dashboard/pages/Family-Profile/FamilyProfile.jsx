import PageHeader from '../../components/common/PageHeader/PageHeader';
import AccountSwitcher from '../../components/ui/dashboard/AccountSwitcher/AccountSwitcher';

import { useFamilyProfileActions } from '../../hooks/Family-Profile/useFamilyProfileActions';
import FamilyProfileToasts from '../../components/ui/Family-Profiles/FamilyProfileToasts/FamilyProfileToasts';
import FamilyProfileModals from '../../components/ui/Family-Profiles/FamilyProfileModals/FamilyProfileModals';
import ChildSection from '../../components/ui/Family-Profiles/ChildSection/ChildSection';

import './FamilyProfile.css';

const FamilyProfile = () => {
  const {
    formattedChildren,
    pairingCode,
    expiryTime,
    cooldown,
    activeChildId,
    removedChildName,
    newActiveChildName,
    modals,
    toasts,
    handlers
  } = useFamilyProfileActions();

  return (
    <div className="dashboard-page child-profile-page">
      <FamilyProfileToasts
        toasts={toasts}
        removedChildName={removedChildName}
        newActiveChildName={newActiveChildName}
      />

      <div className="page-header-row">
        <PageHeader
          title="Family Profiles"
          subtitle="Manage and link your children's devices here"
        />
        <AccountSwitcher />
      </div>

      <ChildSection
        pairingCode={pairingCode}
        expiryTime={expiryTime}
        cooldown={cooldown}
        formattedChildren={formattedChildren}
        handlers={handlers}
      />

      <FamilyProfileModals
        modals={modals}
        handlers={handlers}
        formattedChildren={formattedChildren}
        activeChildId={activeChildId}
        removedChildName={removedChildName}
      />
    </div>
  );
};

export default FamilyProfile;