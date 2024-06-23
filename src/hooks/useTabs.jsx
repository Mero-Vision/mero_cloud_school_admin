import { Search } from "@mui/icons-material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components/common/CustomInputs/CustomInput";
import { setSearch } from "../rootRedux/utilsSlice";
import styles from "./styles";

const useTabs = ({ data, button, isAccount, hideSearch }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(data?.[0]?.value);
  }, [data?.[0]?.value]);

  const {
    control,
    formState: { errors },
    watch,
  } = useForm({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearch(watch("search")));
    }, [1000]);
    return () => clearTimeout(timeout);
  }, [watch("search")]);

  const tabsComponent = () => {
    return (
      <Box className={classes.root}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            {data?.map((item, index) => (
              <Tab
                key={index}
                value={item?.value}
                icon={item?.icon}
                iconPosition={item?.position || "start"}
                label={item?.label}
              />
            ))}
          </Tabs>
        </Box>

        <Box className={classes.rightSide}>
          {!hideSearch && (
            <Box width={"20rem"}>
              <CustomInput
                control={control}
                errors={errors}
                name="search"
                placeholder={"Search"}
                startIcon={<Search />}
                type="search"
              />
            </Box>
          )}
          {isAccount && (
            <Tooltip title="Tree View">
              <Box
                className={classes.treeViewContainer}
                onClick={() => navigate("tree-view")}
              >
                <AccountTreeOutlinedIcon />
              </Box>
            </Tooltip>
          )}
          {button && <Box>{button}</Box>}
        </Box>
      </Box>
    );
  };

  return {
    value,
    Tabs: tabsComponent(),
  };
};

export default useTabs;
