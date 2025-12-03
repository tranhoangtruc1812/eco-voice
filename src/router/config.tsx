import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ArticleDetail from "../pages/article-detail/page";
import WriteArticle from "../pages/write-article/page";
import Category from "../pages/category/page";
import Categories from "../pages/categories/page";
import Contact from "../pages/contact/page";
import ManageArticles from "../pages/manage-articles/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article/:id",
    element: <ArticleDetail />,
  },
  {
    path: "/write",
    element: <WriteArticle />,
  },
  {
    path: "/manage",
    element: <ManageArticles />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/category/:slug",
    element: <Category />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
