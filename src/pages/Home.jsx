import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NavBar from "../components/NavBar";;

function Home() {
  const [botStatus, setBotStatus] = useState(false);
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          exactpath="/"
          element={
            <Dashboard botStatus={botStatus} setBotStatus={setBotStatus} />
        }
        />
      </Routes>
    </>
  );
}

export default Home;
