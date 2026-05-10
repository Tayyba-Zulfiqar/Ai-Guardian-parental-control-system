
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useDeviceControls from '../../hooks/App-Controls/useDeviceControls';

// Common Components
import PageHeader from '../../components/common/PageHeader/PageHeader';
import Toast from '../../components/common/Toast/Toast';

// Shared App Control Components
import ControlSection from '../../components/ui/App-Controls/shared/ControlSection';
import ConfigurationLockedBanner from '../../components/ui/App-Controls/shared/ConfigurationLockedBanner';
import RestrictedAccessZone from '../../components/ui/App-Controls/shared/RestrictedAccessZone';

// Section Components
import MonitoringStatus from '../../components/ui/App-Controls/sections/MonitoringStatus/MonitoringStatus';
import LogoutProtection from '../../components/ui/App-Controls/sections/LogoutProtection/LogoutProtection';
import SecurityPIN from '../../components/ui/App-Controls/sections/SecurityPIN/SecurityPIN';

// Consolidated Modals
import AppControlModals from '../../components/ui/App-Controls/modals/AppControlModals';

import './AppControls.css';

const AppControls = () => {
  const {
    monitoring,
    requests,
    pin,
    modals,
    toast
  } = useDeviceControls();

  const handleLockedClick = () => {
    toast.show('Set a Security PIN first to configure logout protection', 'warning');
  };

  return (
    <div className="app-controls-page">
      <PageHeader
        title="Device Controls"
        subtitle="Manage monitoring and logout protection rules"
      />

      <section className="dashboard-content">
        <div className="controls-grid single-column">
          <div className="controls-main">
            {/* Section 1: Security PIN */}
            <ControlSection title="Security & Access">
              <SecurityPIN
                isPinSet={pin.isSet}
                lastChangedDate={pin.lastChangedDate}
                onSetPin={pin.openModal}
                onRemovePin={pin.handleRemove}
              />
            </ControlSection>

            {/* Section 2 & 3: Monitoring & Logout Protection */}
            {!pin.isSet && <ConfigurationLockedBanner />}

            <RestrictedAccessZone
              isLocked={!pin.isSet}
              onLockedClick={handleLockedClick}
            >
              <ControlSection title="Monitoring Settings">
                <MonitoringStatus
                  isActive={monitoring.isActive}
                  onToggle={monitoring.handleToggle}
                />
              </ControlSection>

              <ControlSection title="Logout Protection">
                <LogoutProtection
                  mode={monitoring.mode}
                  onModeChange={monitoring.handleModeChange}
                  pendingRequests={requests.data}
                  onApproveRequest={requests.handleApprove}
                  onDenyRequest={requests.handleDeny}
                />
              </ControlSection>
            </RestrictedAccessZone>
          </div>
        </div>
      </section>

      {/* All App Control Modals */}
      <AppControlModals
        confirmToggle={modals.confirmToggle}
        pinSetup={modals.pinSetup}
        verifyPin={modals.verifyPin}
        pinRecommendation={modals.pinRecommendation}
        finalConfirm={modals.finalConfirm}
      />

      {/* Toasts */}
      <AnimatePresence>
        {toast.data && (
          <div className="toast-container">
            <Toast
              message={toast.data.message}
              type={toast.data.type}
              onClose={toast.close}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppControls;
