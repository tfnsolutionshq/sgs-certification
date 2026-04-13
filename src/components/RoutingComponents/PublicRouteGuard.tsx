import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContextProvider";
import { isAuthenticated } from "../../utils/auth";

const PublicRouteGuard = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div className="bg-white h-screen"></div>;
  }

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRouteGuard;
