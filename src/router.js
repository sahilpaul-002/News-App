import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Home from "./components/Home"
import News from "./components/News";
import Category from "./components/Category";
import About from "./components/About";
import indiaSampleData from "./indiaSample.json"

const getArticles = (category) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(indiaSampleData[category].articles)
    }, 2000);
  });
};

const Router = createBrowserRouter([
  {
    path: "/",
    Component: App, // App will be the layout
    children: [
      {
        index: true,
        Component: Home, // shows at "/"
      },
      {
        path: "news",
        Component: News, // shows at "/news" for All News
      },
      {
        path: "news/category/:country/:category",
        loader: async ({ params }) => {
          const categoryArticles = await getArticles(params.category);
          return { categoryArticles: categoryArticles };
          },
        // lazy: async () => {
        //   const [{ default: Category }, { default: loader }] = await Promise.all([
        //     import("./components/Category"),   // the route component
        //     import("./loaders/CategoryLoader") // the loader function (e.g., getArticles internally)
        //   ]);
        //   return { Component: Category, loader };
        // },
            Component: Category
      },
      {
        path: "about",
        Component: About, // shows at "/about"
      }
    ]
  }
])

export default Router;