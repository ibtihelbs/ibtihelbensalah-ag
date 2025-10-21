// router.tsx
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Roots";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogPost />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
    ],
  },
]);
