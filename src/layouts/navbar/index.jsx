import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CustomBreadcrumbs from "../../components/common/CustomBreadcrumbs/CustomBreadcrumbs";
import AccountMenu from "./AccountMenu";
import useStyles from "./Styles";

const Navbar = () => {
   const classes = useStyles();
   const location = useLocation();
   const paths = location.pathname.split("/").filter(Boolean);
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   console.log({ paths });
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Box className={classes.root}>
         <Box className={classes.header}>
            <Box className={classes.main}>
               {paths?.length
                  ? paths?.slice(-1)?.toString()?.replaceAll("-", " ")
                  : "Hi User!"}
            </Box>
            <Box className={classes.breadcrumbs}>
               {" "}
               <CustomBreadcrumbs data={{ color: "#fff" }} />
            </Box>
         </Box>

         <Box className={classes.right}>
            {/* <CustomDateRangePicker /> */}
            <AccountMenu />
         </Box>
      </Box>
   );
};

export default Navbar;

const LinkComponent = ({ row }) => {
   const classes = useStyles();
   return (
      <NavLink
         to={row?.url}
         className={({ isActive }) => {
            return isActive && classes.active;
         }}
      >
         <Typography>{row?.label}</Typography>
      </NavLink>
   );
};
