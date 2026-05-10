
import './Card.css';

const Card = ({ children, className = '', title, subtitle, icon: Icon }) => {
  return (
    <div className={`custom-card ${className}`}>
      {(title || Icon) && (
        <div className="custom-card-header">
          {Icon && <div className="custom-card-icon"><Icon size={20} /></div>}
          <div className="custom-card-title-group">
            {title && <h3 className="custom-card-title">{title}</h3>}
            {subtitle && <p className="custom-card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="custom-card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
