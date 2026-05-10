
import { Smartphone, Tablet, Trash2, Globe } from 'lucide-react';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import './ConnectedDevices.css';

const ConnectedDevices = ({ devices, onRemoveDevice }) => {
  return (
    <Card className="connected-devices-card">
      <div className="devices-list">

        {devices.map((device) => (
          <div key={device.id} className="device-item">
            <div className="device-main">
              <div className={`device-icon-box ${device.name.toLowerCase().includes('ipad') ? 'tablet' : 'phone'}`}>
                {device.name.toLowerCase().includes('ipad') ? <Tablet size={20} /> : <Smartphone size={20} />}
              </div>
              <div className="device-details">
                <div className="device-header-row">
                  <span className="device-name">{device.name}</span>
                  <span className={`device-status-badge ${device.status}`}>
                    {device.status}
                  </span>
                </div>
                <div className="device-meta">
                  <span>Owner: <strong>{device.owner}</strong></span>
                  <span className="separator">•</span>
                  <span>Last seen: {device.lastSeen}</span>
                </div>
              </div>
            </div>
            <div className="device-actions">
              <Button 
                variant="danger" 
                size="small" 
                icon={Trash2}
                onClick={() => onRemoveDevice(device.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="add-device-hint">
        <Globe size={16} />
        <span>To add a new device, install AI-Guardian app and scan the QR code from your dashboard.</span>
      </div>
    </Card>
  );
};

export default ConnectedDevices;
