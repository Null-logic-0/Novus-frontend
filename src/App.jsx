import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../util/http.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../pages/Root.jsx";
import Home from "../pages/Home.jsx";
import Search from "../pages/Search.jsx";
import Activity from "../pages/Activity.jsx";
import Profile from "../pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "activity", element: <Activity /> },
      { path: ":slug", element: <Profile /> },
    ],
  },
  {
    path: "signup",
    element: <h1>signup</h1>,
  },
  {
    path: "login",
    element: <h1>login</h1>,
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
