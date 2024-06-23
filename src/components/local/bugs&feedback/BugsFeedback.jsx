import { BugReport } from "@mui/icons-material";
import { Box, Chip, Drawer } from "@mui/material";
import { useState } from "react";
import { useGetBugsQuery } from "../../../apis/bugfeedbackApi";
import useTabs from "../../../hooks/useTabs";
import { changeDateFormat } from "../../../utils/helpers";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import SingleBugFeedback from "./SingleBugFeedback";
import UpdateBugStatus, { switchStyles } from "./UpdateBugStatus";

const BugsFeedback = () => {
  const { data: bugsData, isFetching } = useGetBugsQuery();
  const [drawerState, setDrawerState] = useState(false);
  const [row, setRow] = useState(null);

  console.log({});
  const columns = [
    {
      flex: 1,
      field: "bugs",
      headerName: "Raised Bugs",
      renderCell: (props) => (
        <div
          className="title"
          style={{ width: "100%" }}
          onClick={(event) => handleDrawerState(props?.row, event)}
        >
          <p className="title">{props?.row?.description}</p>
        </div>
      ),
    },

    {
      flex: 0.2,
      field: "created_at",
      headerName: "Created At",
      renderCell: (props) => <p>{changeDateFormat(props?.row?.created_at)}</p>,
    },

    {
      flex: 0.2,
      field: "created_by",
      headerName: "Created By",
      renderCell: (props) => <p>{props?.row?.user?.name ?? "-"}</p>,
    },
    {
      flex: 0.2,
      field: "status",
      headerName: "Status",

      renderCell: (props) => (
        <UpdateBugStatus status={props?.row?.status} row={props?.row} />
      ),
    },
  ];

  const tabData = [
    {
      label: "Bugs and Feedback",
      value: "approved",
      icon: <BugReport />,
    },
  ];

  const { Tabs } = useTabs({
    data: tabData,
  });

  const handleDrawerState = (row, event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setDrawerState((prev) => !prev);
    }
    setDrawerState((prev) => !prev);

    if (row) {
      setRow(row);
    }
  };

  return (
    <>
      {Tabs}
      {isFetching && <CustomLoader />}

      {!isFetching && (
        <Box>
          <CustomDataGrid rows={bugsData?.data || []} columns={columns} />
        </Box>
      )}

      <Drawer
        anchor={"right"}
        open={drawerState}
        onClose={(event) => handleDrawerState(null, event)}
      >
        <Box
          sx={{ width: "100vw", background: "#f9f9fb", minHeight: "100%" }}
          role="presentation"
        >
          <SingleBugFeedback handleClose={handleDrawerState} singleBug={row} />
        </Box>{" "}
      </Drawer>
    </>
  );
};

export default BugsFeedback;

export const RenderStatus = ({ status }) => {
  const toLowerCasedStatus = String(status)?.toLowerCase();

  return (
    <>
      <Chip
        title={status}
        label={status === "in_progress" ? "in progress" : status}
        variant="outlined"
        size="small"
        style={{
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "capitalize",
          color: switchStyles(
            status === "in progress" ? "in_progress" : status
          ),
        }}
      />
    </>
  );
};
