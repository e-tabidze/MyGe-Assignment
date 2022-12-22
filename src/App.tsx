import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Routes/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import loader from "./Helper/Redirect";
const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    loader: loader,
  },
  {
    path: "/ka/",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
