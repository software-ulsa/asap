import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./app/context/AuthContext";

import { RouterProvider } from "react-router-dom";
import publicRoutes from "./app/routes/publicRoutes";
import privateRoutes from "./app/routes/dashboardRoutes";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {currentUser ? (
        <RouterProvider router={privateRoutes} />
      ) : (
        <RouterProvider router={publicRoutes} />
      )}
    </>
  );
}

export default App;
