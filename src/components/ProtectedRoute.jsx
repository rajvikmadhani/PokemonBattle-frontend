import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  // Redirection if no user is signed in
  return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
