import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 5 }}>
            My Profile
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2 }}
            align={"right"}
          >
            <Link to={"/posts"}>My Posts</Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2 }}
            align={"right"}
          >
            <Link to={"/todos"}>My Todos</Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2 }}
            align={"right"}
          >
            <Link to={"/albums"}>My Albums</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
