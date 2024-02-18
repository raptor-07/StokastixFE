import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Logger from "./components/Logger";
import AnalyticsTabPanel from "./components/AnalyticsTabPanel";
import isJwtVerified from "./Utilities/isJwtVerified";
import isJwtExists from "./Utilities/isJwtExists";
import Dashboard from "./pages/Dashboard";

function PrivateRoute() {
  const navigate = useNavigate();

  const [botStatus, setBotStatus] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("test");
    const checkJwt = async () => {
      if (isJwtExists() && (await isJwtVerified())) {
        console.log("test3");
        console.log("now logged in");
        setIsAuthenticated(true);
      } else {
        navigate("/login");
      }
    };

    checkJwt();
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard botStatus={botStatus} setBotStatus={setBotStatus} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/logs"
          element={isAuthenticated ? <Logger /> : <Login />}
        />
        <Route
          path="/analytics"
          element={isAuthenticated ? <AnalyticsTabPanel /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default PrivateRoute;
