import { Navigate } from "react-router-dom";

// children 소문자 주의
const PrivateRoute = ({ user, children }) => {
  return <div>{user ? children : <Navigate to="/login" />}</div>;
};

// user? TodoPage : redirect->login

export default PrivateRoute;
