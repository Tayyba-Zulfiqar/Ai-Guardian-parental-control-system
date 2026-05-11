import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but hasn't connected a child,
  // redirect them to /connect-child unless they are already there
  if (!user.hasChildConnected && location.pathname !== '/connect-child') {
    return <Navigate to="/connect-child" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;