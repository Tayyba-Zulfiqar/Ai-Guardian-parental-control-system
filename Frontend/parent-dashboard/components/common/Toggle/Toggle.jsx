
import './Toggle.css';

const Toggle = ({ checked, onChange, disabled = false, size = 'medium' }) => {
  return (
    <label className={`toggle-switch ${size} ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="toggle-slider"></span>
    </label>
  );
};

export default Toggle;
