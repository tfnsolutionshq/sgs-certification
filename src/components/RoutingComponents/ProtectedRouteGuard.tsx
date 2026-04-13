import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContextProvider";
import { isAuthenticated } from "../../utils/auth";

const ProtectedRouteGuard = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div className="bg-white h-screen"></div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteGuard;
