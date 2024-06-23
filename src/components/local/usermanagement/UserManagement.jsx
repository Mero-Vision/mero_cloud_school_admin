import { Add, AdminPanelSettings, AssignmentInd } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import CustomModal from "../../common/CustomModal/CustomModal";
import AddCustomRole from "./AddCustomRole";
import PermissionTable from "./PermissionTable";
import RolesTable from "./RolesTable";

const UserManagement = () => {
  const { row, handleClose, handleOpen, modals } = useModal();
  const { Tabs, value } = useTabs({
    data: [
      {
        label: "Roles",
        value: "roles",
        icon: <AdminPanelSettings />,
      },
      {
        label: "Permissions",
        value: "permissions",
        icon: <AssignmentInd />,
      },
    ],

    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("create_custom_role")}
      >
        Add role
      </Button>
    ),
  });
  return (
    <>
      {Tabs}

      {value === "permissions" && <PermissionTable />}
      {value === "roles" && <RolesTable />}

      <CustomModal
        modalTitle={"Add custom role"}
        open={modals?.create_custom_role}
        width={"500px"}
        handleClose={() => handleClose("create_custom_role")}
      >
        <AddCustomRole handleClose={() => handleClose("create_custom_role")} />
      </CustomModal>
    </>
  );
};

export default UserManagement;
