import { Navigate } from "react-router-dom";
import { getToken } from "../utils/features";

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = () => {
    const authState = getToken();

    if (authState?.access_token) {
      return true;
    }
    return false;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoutes;
