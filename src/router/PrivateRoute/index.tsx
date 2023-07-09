import { AuthContext } from "context/AuthProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return isLogin ? props.children : null;
};

export default PrivateRoute;
