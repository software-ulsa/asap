import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { publicRoutes } from "./app/routes/publicRoutes";
import { dashboardRoutes } from "./app/routes/dashboardRoutes";

import { ToastContainer } from "react-toastify";
import SecureLS from "secure-ls";

import { getCurrentUserById } from "./app/services/UsuarioService";

function App() {
  const dispatch = useDispatch();
  const ls = new SecureLS({ encodingType: "aes" });

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    let user = null;
    const auth = ls.get("_user");
    if (auth !== "") {
      user = JSON.parse(auth);
      dispatch(getCurrentUserById(user.id));
    }
  }, [dispatch]);

  useEffect(() => {}, [currentUser]);

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
