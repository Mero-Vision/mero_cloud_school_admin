import { Add, ExpandMore } from "@mui/icons-material";
import { Collapse, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import AllModals from "../../components/common/AllModals/AllModals";
import { SidebarConstants } from "../../constants/SidebarConstants";
import useStyles from "./styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: "hidden",
});

const closedMixin = (theme) => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: "hidden",
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
   },
});

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
   }),
}));

export default function Sidebar() {
   const { search, pathname } = useLocation();

   const theme = useTheme();
   const classes = useStyles();
   const [open, setOpen] = React.useState(
      sessionStorage.getItem("active")
   );
   const handleClick = (item) => {
      sessionStorage.setItem(
         "active",
         open === item?.label ? "" : item?.label
      );
      setOpen((prev) => (prev === item?.label ? "" : item?.label));
   };

   const getClassName = (isActive, item) => {
      return isActive
         ? item?.children?.length
            ? item?.children?.some((nestedItem) =>
                 window.location.pathname.includes(nestedItem.url)
              )
               ? classes.activeClass
               : classes.inactiveClass
            : classes.activeClass
         : classes.inactiveClass;
   };

   const getIcon = (isActive, item) => {
      return isActive
         ? item?.children?.length
            ? item?.children?.some((nestedItem) =>
                 window.location.pathname.includes(nestedItem.url)
              )
               ? item?.activeIcon
               : item?.icon
            : item?.activeIcon
         : item?.icon;
   };

   return (
      <Box
         sx={{
            display: "flex",
            "& .MuiDrawer-paper": { border: "none" },
         }}
      >
         <CssBaseline />

         <Drawer variant="permanent" open>
            <Box className={classes.drawer}>
               <DrawerHeader>
                  <Box className={classes.drawerHeader}>
                     <img src={Logo} />
                     <Box>
                        <Typography
                           fontWeight={600}
                           fontSize={"medium"}
                           sx={{ lineHeight: 1 }}
                        >
                           Mero Cloud School
                        </Typography>

                        {/* <Typography
                           fontWeight={500}
                           fontSize={"11px"}
                        >
                           Dillibazar, Kathmandu
                        </Typography> */}
                     </Box>
                  </Box>
               </DrawerHeader>
               {/* <Box className={classes.drawerContent}>
            <CustomPopover
              ButtonComponent={
                <Box width={"100%"}>
                  <Button variant="contained" startIcon={<Add />} fullWidth>
                    Add New
                  </Button>
                </Box>
              }
              component={<AddAll />}
            />
          </Box> */}
               {SidebarConstants?.map((row, index) => (
                  <List
                     key={row?.header}
                     subheader={
                        <Box
                           sx={{
                              fontSize: "11px",
                              padding: "5px 12px",
                           }}
                        >
                           {row?.header}{" "}
                        </Box>
                     }
                     sx={{ mb: "1rem" }}
                  >
                     {row?.items?.map((item, index) => (
                        <ListItem
                           key={item?.label}
                           disablePadding
                           sx={{
                              display: "block",
                              paddingBottom: "5px",
                           }}
                           className={classes.nav}
                           dsa
                        >
                           <NavLink
                              to={
                                 !item?.children?.length
                                    ? item?.url
                                    : search
                                    ? search
                                    : pathname
                              }
                              className={({ isActive }) =>
                                 getClassName(isActive, item)
                              }
                           >
                              {({ isActive }) => (
                                 <ListItemButton
                                    className={classes.listItemButton}
                                    onClick={() =>
                                       item?.children?.length !== 0
                                          ? handleClick(item)
                                          : handleClick()
                                    }
                                    style={{
                                       background:
                                          open === item?.label &&
                                          "#f6f6f6",
                                    }}
                                 >
                                    <ListItemIcon
                                       sx={{
                                          minWidth: 0,
                                          mr: 2,
                                          justifyContent: "center",
                                       }}
                                    >
                                       {isActive
                                          ? item?.children?.length
                                             ? item?.children?.some(
                                                  (nestedItem) =>
                                                     window.location.pathname.includes(
                                                        nestedItem.url
                                                     )
                                               )
                                                ? item?.activeIcon
                                                : item?.icon
                                             : item?.activeIcon
                                          : item?.icon}
                                    </ListItemIcon>

                                    <ListItemText
                                       primary={item?.label}
                                    />
                                    {item?.children?.length !== 0 && (
                                       <ExpandMore
                                          sx={{
                                             transition:
                                                "transform 0.3s",
                                             transform:
                                                open === item?.label
                                                   ? "rotate(-180deg)"
                                                   : "rotate(0deg)",
                                          }}
                                       />
                                    )}
                                 </ListItemButton>
                              )}
                           </NavLink>

                           <Collapse
                              in={open === item?.label}
                              timeout="auto"
                              unmountOnExit
                           >
                              <Box className={classes.childContainer}>
                                 {item?.children?.map(
                                    (child, index) => (
                                       <ChildComponent
                                          child={child}
                                          key={index}
                                          classes={classes}
                                       />
                                    )
                                 )}
                              </Box>
                           </Collapse>
                        </ListItem>
                     ))}
                  </List>
               ))}
            </Box>
         </Drawer>
      </Box>
   );
}

const ChildComponent = ({ child, classes }) => {
   const [hover, setHover] = React.useState(false);
   const [open, setOpen] = useState(false);
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <List
            key={child?.label}
            component="div"
            disablePadding
            sx={{ paddingBottom: "5px" }}
            className={classes.nav}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
         >
            <NavLink to={child?.url}>
               {({ isActive }) => (
                  <ListItemButton
                     className={[
                        classes.listItemButtonChild,
                        isActive && classes.activeChildClass,
                     ]}
                  >
                     <ListItemText
                        primary={child?.label}
                        className="active"
                     />
                     <IconButton
                        onClick={handleOpen}
                        className={classes.iconButton}
                        sx={{
                           visibility: hover ? "visible" : "hidden",
                        }}
                     >
                        {<Add />}
                     </IconButton>
                  </ListItemButton>
               )}
            </NavLink>
         </List>
         <AllModals
            modalType={child?.url?.split("/")?.pop()}
            open={open}
            handleClose={() => handleClose()}
         />
      </>
   );
};
