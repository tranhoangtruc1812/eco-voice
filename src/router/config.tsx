import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ArticleDetail from "../pages/article-detail/page";
import WriteArticle from "../pages/write-article/page";
import Category from "../pages/category/page";
import Categories from "../pages/categories/page";
import Contact from "../pages/contact/page";
import ManageArticles from "../pages/manage-articles/page";
import ManageCategories from "../pages/manage-categories/page";
import Login from "../pages/login/page";
import About from "../pages/about/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
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
    path: "/manage-categories",
    element: <ManageCategories />,
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
