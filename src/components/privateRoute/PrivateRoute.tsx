import { Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";
import { useEffect } from "react";

function PrivateRoute() {
  const { isLogin } = useLoginContext();

  useEffect(() => {
    console.log("isLogin updated:", isLogin);
  }, [isLogin]);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
