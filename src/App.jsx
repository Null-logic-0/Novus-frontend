import { createBrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "react-hot-toast";
import { queryClient } from "../util/http.js";

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
import ProtectRoutes from "../components/Authorization/ProtectRoutes.jsx";
import AppShell from "../components/AppShell.jsx";
import FeedRoot from "./pages/FeedRoot.jsx";
import Followings from "./pages/Followings.jsx";
import Liked from "./pages/Liked.jsx";
import Error from "./pages/Error.jsx";
import Direct from "./pages/Direct.jsx";
import DirectRoot from "./pages/DirectRoot.jsx";
import Inbox from "./pages/Inbox.jsx";
import NotificationProvider from "../components/Notification/NotificationProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: (
      <ProtectRoutes>
        <AppShell>
          <NotificationProvider>
            <RootLayout />
          </NotificationProvider>
        </AppShell>
      </ProtectRoutes>
    ),
    children: [
      {
        path: "/",
        element: <FeedRoot />,
        children: [
          { index: true, element: <Posts /> },
          { path: "followings", element: <Followings /> },
          { path: "liked", element: <Liked /> },
        ],
      },
      { path: "search", element: <Search /> },
      { path: "activity", element: <Activity /> },
      { path: ":slug", element: <Profile /> },
      { path: "posts/:userId/post/:postId", element: <Post /> },
      {
        path: "settings",
        element: <SettingsRoot />,
        children: [
          { path: "blocked-profiles", element: <BlockedProfiles /> },
          { path: "account", element: <Account /> },
        ],
      },
    ],
  },
  {
    path: "direct",
    errorElement: <Error />,
    element: (
      <ProtectRoutes>
        <AppShell>
          <NotificationProvider>
            <DirectRoot />
          </NotificationProvider>
        </AppShell>
      </ProtectRoutes>
    ),
    children: [
      {
        index: true,
        element: <Direct />,
      },
      {
        path: "inbox/:id",
        element: <Inbox />,
      },
    ],
  },
  { path: ":userId/post/:postId/media", element: <Media /> },
  {
    path: "/signup",
    errorElement: <Error />,
    element: <Signup />,
  },

  {
    path: "/login",
    errorElement: <Error />,
    element: <Login />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
