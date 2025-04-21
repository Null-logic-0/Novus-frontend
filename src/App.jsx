import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../util/http.js";
import { createBrowserRouter, RouterProvider } from "react-router";

import Posts from "./pages/Posts.jsx";
import Search from "./pages/Search.jsx";
import Activity from "./pages/Activity.jsx";
import Profile from "./pages/Profile.jsx";
import Post from "./pages/Post.jsx";
import Media from "./pages/Media.jsx";
import RootLayout from "./pages/Root.jsx";
import Signup from "./pages/Singup.jsx";
import Login from "./pages/Login.jsx";
import SettingsRoot from "./pages/SettingsRoot.jsx";
import BlockedProfiles from "./pages/BlockedProfiles.jsx";
import Account from "./pages/Account.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Posts /> },
      { path: "search", element: <Search /> },
      { path: "activity", element: <Activity /> },
      { path: ":slug", element: <Profile /> },
      { path: ":userId/post/:postId", element: <Post /> },
      { path: ":userId/post/:postId/media", element: <Media /> },
    ],
  },
  {
    path: "settings",
    element: <SettingsRoot />,
    children: [
      { path: "blocked-profiles", element: <BlockedProfiles /> },
      { path: "account", element: <Account /> },
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
