import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
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

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formTarget = document.querySelector("form");
    const data = new FormData(formTarget);
    const serializedData = JSON.stringify(Object.fromEntries(data.entries()));

    //Response type format from the backend:
    // Response {
    //   result: boolean;
    //   token: string;
    //   description: string;
    // }
    //token is an empty string when result is false

    fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      body: serializedData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data.result) {
          localStorage.setItem("jwtToken", data.token);

          navigate("/");

          return;
        } else {
          alert(data.description);
        }
      });
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 0, bgcolor: "Highlight" }}
            src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-vector-lock-icon-png-image_1028350.jpg"
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              autoComplete="username"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "white", color: "black" }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "white" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: "white" }}>
                  {"Don't have an account?"}
                  <h4
                    sx={{
                      color: "white",
                      display: "inline",
                      marginLeft: "5px",
                    }}
                  >
                    Sign Up
                  </h4>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
