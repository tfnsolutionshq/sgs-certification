import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContextProvider";

const PublicRouteGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="bg-white h-screen"></div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRouteGuard;
