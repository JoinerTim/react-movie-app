import { Navigate } from "react-router-dom";
import Home from "../../pages/Home";


const PrivateRoute = () => {
  return (
      <>
        {localStorage.getItem("authToken") ? (
          <Home />
        ) : (
          <Navigate to="/login" />
        )}
  </>)
};

export default PrivateRoute;