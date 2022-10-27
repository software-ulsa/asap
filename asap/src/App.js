import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import publicRoutes from "./app/routes/publicRoutes";
import privateRoutes from "./app/routes/dashboardRoutes";

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
        <RouterProvider router={privateRoutes} />
      ) : (
        <RouterProvider router={publicRoutes} />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
