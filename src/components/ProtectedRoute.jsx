import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  console.log('USER CHECK!!!', user);

  // Redirection if no user is signed in
  return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
