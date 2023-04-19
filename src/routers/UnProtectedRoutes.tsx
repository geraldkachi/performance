import { Navigate } from 'react-router-dom';
import UnAuthLayout from '../components/layout/UnAuthLayout';

const UnProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  return !token ? <UnAuthLayout /> : <Navigate to="/home" />;
}

export default UnProtectedRoutes
