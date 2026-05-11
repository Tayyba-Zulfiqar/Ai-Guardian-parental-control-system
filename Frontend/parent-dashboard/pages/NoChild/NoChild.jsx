import { Link } from 'react-router-dom';
import './NoChild.css';

const NoChild = () => {
  return (
    <div className="no-child-page">
      <div className="no-child-container">
        <div className="no-child-icon">
          👪
        </div>
        <h1>No Child Connected</h1>
        <p>
          You haven't connected any child accounts yet. Set up a family profile to start monitoring and protecting your child's digital experience.
        </p>
        <Link to="/family-profile" className="setup-profile-btn">
          Setup Family Profile
        </Link>
      </div>
    </div>
  );
};

export default NoChild;
