import { UserModel } from "interface/User";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { initUserInfo } from "redux/userSlice/slice";
import { REQUEST_METHOD, query } from "utils/httpClients";

interface AuthContextValue {
  isLogin?: boolean;
  setLogin?: (loginStatus: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!!token) {
      setLogin(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLogin && token) {
      query<never, UserModel>({
        url: "/user/profile",
        method: REQUEST_METHOD.GET,
        tokenRequired: true,
      }).then((res) => dispatch(initUserInfo(res.data)));
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
