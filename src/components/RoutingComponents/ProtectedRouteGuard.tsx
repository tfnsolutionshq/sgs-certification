import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContextProvider";

const ProtectedRouteGuard = () => {
  const { user, loading } = useAuth();

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  if (loading) {
    return <div className="bg-white h-screen"></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteGuard;
