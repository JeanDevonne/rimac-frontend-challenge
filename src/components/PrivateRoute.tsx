import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
} 