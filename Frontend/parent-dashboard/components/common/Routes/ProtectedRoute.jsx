import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useChild } from '../../../context/ChildContext';

const ProtectedRoute = ({
  requireChild = false,
  allowNoChild = false,
}) => {

  const { user, loading } = useAuth();
  const { childrenList, isLoading: childLoading } = useChild();

  if (loading || childLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowNoChild) {
    return <Outlet />;
  }

  const hasChildren = childrenList?.length > 0;

  if (requireChild && !hasChildren) {
    return <Navigate to="/connect-child" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;