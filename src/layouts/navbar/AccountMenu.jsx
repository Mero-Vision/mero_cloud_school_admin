import { ScheduleSharp } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../apis/authApi";
import profileImg from "../../assets/profileImg.jpg";
export default function AccountMenu() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleColorChange = (e) => {
      localStorage.setItem("themeColor", e.target.value);
      // window.location.reload();
   };
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   // const handleLogout = () => {
   //   navigate(`/login`);
   // };
   const handleLogout = () => {
      dispatch(logout());
      navigate(`/login`);
   };
   return (
      <React.Fragment>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               textAlign: "center",
            }}
         >
            {/* <IconTooltip data={{ title: "Files", icon: <FolderOpen /> }} />
        <IconTooltip data={{ title: "History", icon: <ScheduleSharp /> }} />

        <IconTooltip
          data={{ title: "Notification", icon: <NotificationsOutlinedIcon /> }}
        />
        <IconTooltip
          data={{ title: "Help", icon: <HelpOutlineOutlinedIcon /> }}
        /> */}

            {/* <input type="color" onChange={(e) => handleColorChange(e)} /> */}

            <Tooltip title="Account settings">
               <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
               >
                  <Avatar sx={{ width: 34, height: 34 }}>
                     <img
                        src={profileImg}
                        alt="Profile Image"
                        style={{ objectFit: "cover" }}
                        height="32"
                        width="32"
                     />
                  </Avatar>
               </IconButton>
            </Tooltip>
         </Box>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                  },
                  "&:before": {
                     content: '""',
                     display: "block",
                     position: "absolute",
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: "background.paper",
                     transform: "translateY(-50%) rotate(45deg)",
                     zIndex: 0,
                  },
               },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
         >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <Divider />

            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Settings fontSize="small" />
               </ListItemIcon>
               Settings
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>
               <ListItemIcon>
                  <Logout fontSize="small" />
               </ListItemIcon>
               Logout
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
}

const TimeComponent = () => {
   const [dateState, setDateState] = useState();
   useEffect(() => {
      const interval = setInterval(
         () => setDateState(new Date()),
         1000
      );
      return () => clearInterval(interval);
   }, []);

   return (
      <Box
         style={{
            width: "85px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2px",
         }}
      >
         <ScheduleSharp
            fontSize="small"
            style={{ color: "#484848" }}
         />
         <span style={{ fontSize: "12px" }}>
            {moment(dateState).format("hh:mm A")}
         </span>
      </Box>
   );
};
