import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../util/http.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../pages/Root.jsx";
import Posts from "../pages/Posts.jsx";
import Search from "../pages/Search.jsx";
import Activity from "../pages/Activity.jsx";
import Profile from "../pages/Profile.jsx";
import BlockedProfiles from "../pages/BlockedProfiles.jsx";
import ChangePassword from "../pages/ChangePassword.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Singup.jsx";
import SettingsRoot from "../pages/SettingsRoot.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Posts /> },
      { path: "search", element: <Search /> },
      { path: "activity", element: <Activity /> },
      { path: ":slug", element: <Profile /> },
      { path: ":userId/post/:postId", element: <Profile /> },
    ],
  },
  {
    path: "settings",
    element: <SettingsRoot />,
    children: [
      { path: "blocked-profiles", element: <BlockedProfiles /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
