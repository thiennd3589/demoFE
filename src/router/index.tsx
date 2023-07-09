import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeScreen, LoginScreen } from "screens";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "screens/LandingPage";
import MeetScreen from "screens/MeetScreen";
import Splash from "components/Splash";

const router = createBrowserRouter([
  { path: "", element: <HomeScreen /> },
  { path: "login", element: <LoginScreen /> },
  {
    path: "/landing",
    element: (
      <PrivateRoute>
        <LandingPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/meet/:meetId",
    element: (
      <PrivateRoute>
        <MeetScreen />
      </PrivateRoute>
    ),
  },
]);

export default function Router() {
  return (
    <Suspense fallback={<Splash />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}
