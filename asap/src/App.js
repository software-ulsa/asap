import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { publicRoutes } from "./app/routes/publicRoutes";
import { dashboardRoutes } from "./app/routes/dashboardRoutes";

import { checkUser } from "./app/reducers/AuthReducer";

import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading) {
      dispatch(checkUser());
    }
  }, [currentUser, dispatch]);

  return (
    <>
      {currentUser ? (
        <RouterProvider
          router={createBrowserRouter(
            dashboardRoutes(currentUser.rol.permisos).routes
          )}
        />
      ) : (
        <RouterProvider router={createBrowserRouter(publicRoutes)} />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
