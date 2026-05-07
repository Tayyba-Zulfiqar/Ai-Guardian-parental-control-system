import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, Copy, ShieldCheck, Check } from 'lucide-react';
import './PairingCard.css';

const PairingCard = ({ pairingCode, expiryTime, onRegenerate, onSimulateConnect, cooldown }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="pairing-card">
      <div className="pairing-header">
        <div className="pairing-title-group">
          <ShieldCheck className="pairing-icon" />
          <div>
            <h2 className="pairing-title">Link New Child</h2>
            <p className="pairing-subtitle">Install AI-Guardian on child's device and enter this code</p>
          </div>
        </div>
        <div className="regenerate-container">
          <button
            className={`regenerate-btn ${cooldown > 0 ? 'disabled' : ''}`}
            onClick={onRegenerate}
            disabled={cooldown > 0}
          >
            <RefreshCw size={16} className={cooldown > 0 ? 'spinning' : ''} />
            <span>{cooldown > 0 ? `Wait ${cooldown}s` : 'Regenerate'}</span>
          </button>
          {cooldown > 0 && <p className="cooldown-hint">Code can be Re-generated in {cooldown} seconds</p>}
        </div>
      </div>

      <div className="pairing-content">
        <div className="qr-section">
          <div className="qr-container">
            <QRCodeSVG
              value={pairingCode}
              size={150}
              level={'H'}
              includeMargin={true}
            />
          </div>
          <p className="qr-caption">Scan QR code for quick setup</p>
        </div>

        <div className="code-section">
          <div className="code-display">
            <span className="code-label">Pairing Code</span>
            <div className="code-value-container">
              <span className="code-value">{pairingCode}</span>
              <div className="copy-wrapper">
                <button 
                  className={`copy-btn ${copied ? 'copied' : ''}`} 
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                {copied && <span className="copy-tooltip">Copied!</span>}
              </div>
            </div>
            <p className="expiry-text">Expires in: <span className="expiry-time">{expiryTime}</span></p>
          </div>

          <div className="simulation-dev-section">
            <div className="dev-tag">DEVELOPMENT ONLY</div>
            <p className="dev-hint">Simulate a device successfully entering the code</p>
            <button className="simulate-btn" onClick={onSimulateConnect}>
              Connect Device Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PairingCard;
