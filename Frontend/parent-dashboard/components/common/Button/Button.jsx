
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', // primary, secondary, danger, outline, ghost
  size = 'medium', // small, medium, large
  disabled = false,
  type = 'button',
  icon: Icon,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={size === 'small' ? 14 : 18} className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;
