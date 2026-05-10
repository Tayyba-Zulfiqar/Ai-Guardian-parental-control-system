
import { ShieldCheck, Info, AlertTriangle } from 'lucide-react';
import Card from '../../../../common/Card/Card';
import Button from '../../../../common/Button/Button';
import './SecurityPIN.css';

const SecurityPIN = ({ isPinSet, lastChangedDate, onSetPin, onRemovePin }) => {
  return (
    <Card className="security-pin-card">
      <div className="security-pin-header">
        <h3 className="security-pin-title">
          <ShieldCheck size={20} className="header-icon" />
          SECURITY PIN
        </h3>
      </div>
      
      <div className="security-pin-divider"></div>
      
      <div className="security-pin-body">
        {!isPinSet ? (
          <div className="pin-status-row">
            <span className="status-label">Status:</span>
            <div className="status-indicators">
              <div className="status-item active">
                <div className="radio-outer">
                  <div className="radio-inner"></div>
                </div>
                <span>Not set</span>
              </div>
              <span className="status-separator">or</span>
              <div className="status-item">
                <div className="radio-outer">
                  <div className="radio-inner"></div>
                </div>
                <span>Set</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pin-set-details">
            <div className="status-indicator-compact">
              <span className="status-label">Status:</span>
              <div className="status-item active">
                <div className="radio-outer">
                  <div className="radio-inner"></div>
                </div>
                <span className="status-text-bold">PIN is set</span>
              </div>
            </div>
            {lastChangedDate && <div className="last-changed">Last changed: {lastChangedDate}</div>}
          </div>
        )}

        <div className="pin-actions">
          <Button 
            variant="outline" 
            className="pin-main-btn"
            onClick={onSetPin}
          >
            {isPinSet ? "CHANGE SECURITY PIN" : "SET SECURITY PIN"}
          </Button>
          
          {isPinSet && (
            <Button 
              variant="danger-outline" 
              className="pin-remove-btn"
              onClick={onRemovePin}
            >
              REMOVE PIN
            </Button>
          )}
        </div>

        <div className="security-pin-footer">
          <div className="footer-divider"></div>
          {isPinSet ? (
            <div className="pin-warning">
              <AlertTriangle size={18} className="warning-icon" />
              <p>Without a PIN, Approval Mode and PIN Mode cannot be used securely.</p>
            </div>
          ) : (
            <div className="pin-info-section">
              <div className="info-header">
                <Info size={16} className="info-icon" />
                <span>This PIN is required for:</span>
              </div>
              <ul className="info-list">
                <li>Approving child logout requests</li>
                <li>Child logout in PIN Mode</li>
                <li>Disabling monitoring</li>
                <li>Removing device access</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SecurityPIN;
