import { lazy } from "react";

export const LoginScreen = lazy(
  () => import(/* webpackChunkName: "Login" */ "./Login")
);

export const HomeScreen = lazy(
  () => import(/* webpackChunkName: "Home" */ "./Home")
);
