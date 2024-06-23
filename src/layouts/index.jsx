import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import useStyles from "./styles";

const MainLayout = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Sidebar />
        <Box sx={{ background: "#F9F9FB", width: "100%" }}>
          <Box sx={{ paddingInline: "46px" }}>
            <Navbar />
          </Box>
          <Divider />
          <Box className={classes.content}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
