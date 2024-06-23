import { PersonOutline } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./style";

const SettingSideBar = () => {
  const settingsArray = [
    {
      label: "Users",
      url: "/settings/users",
      icon: <PersonOutline />,
    },
  ];

  const classes = styles();
  return (
    <Box sx={{ minWidth: "fit-content" }}>
      <List disablePadding>
        {settingsArray?.map((item, index) => (
          <ListItem
            key={item?.label}
            disablePadding
            sx={{ display: "block", paddingBottom: "5px" }}
            className={classes.nav}
          >
            <NavLink
              to={item?.url}
              className={({ isActive }) => isActive && classes.activeClass}
            >
              <ListItemButton
                className={classes.listItemButton}
                sx={{ padding: "2px 10px !important" }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    justifyContent: "center",
                  }}
                >
                  {item?.icon}
                </ListItemIcon>

                <ListItemText primary={item?.label} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingSideBar;
