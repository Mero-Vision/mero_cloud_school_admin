import { Box } from "@mui/material";
import SettingSideBar from "./SettingSideBar";
import styles from "./style";

const SettingLayout = ({ children }) => {
  const classes = styles();
  return (
    <Box>
      <Box className={classes.settingContainer}>
        {/* <h3 className="settingTitle">Site Settings</h3> */}

        <Box className={"settingSideBar"}>
          <SettingSideBar />
          <Box style={{ width: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingLayout;
