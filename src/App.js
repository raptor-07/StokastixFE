import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";

// Define your dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: ["Manrope"].join(","),
  },
});

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<PrivateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
