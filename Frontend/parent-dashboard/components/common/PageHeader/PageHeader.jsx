
import './PageHeader.css';

const PageHeader = ({ title, subtitle }) => {
  return (
    <header className="page-header">
      <h1 className="header-title">{title}</h1>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </header>
  );
};

export default PageHeader;
