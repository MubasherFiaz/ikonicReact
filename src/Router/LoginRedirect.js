import { Navigate } from "react-router-dom";
const LoginRedirect = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to="/feedback" replace />;
  }
  return children;
};
export default LoginRedirect;
