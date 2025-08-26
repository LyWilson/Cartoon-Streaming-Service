import { Link } from "react-router-dom";
import { useAuth } from "../Auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export function Navbar() {
  const { isAuthenticated, clearAuthToken } = useAuth();

  const handleLogout = () => {
    clearAuthToken();
    window.location.href = "/";
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Cartoon Streaming Service
        </Typography>
        {!isAuthenticated && (
          <Box>
            <Button color="inherit" component={Link} to="/register">
              Sign up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Log in
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
          </Box>
        )}
        {isAuthenticated && (
          <Box>
            <Button color="inherit" component={Link} to="/history">
              History
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

