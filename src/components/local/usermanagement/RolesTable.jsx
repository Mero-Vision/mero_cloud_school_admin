import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../../apis/rolesApi";
import useModal from "../../../hooks/useModal";
import { changeDateFormat } from "../../../utils/helpers";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomModal from "../../common/CustomModal/CustomModal";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import AddCustomRole from "./AddCustomRole";

const RolesTable = () => {
  const { data: rolesData, isFetching } = useGetRolesQuery();
  const navigate = useNavigate();

  const { row, handleClose, handleOpen, modals } = useModal();

  const getItems = (is_editable, is_default) => {
    if (is_editable === 1 && is_default !== 1) {
      return [
        {
          icon: <Edit fontSize="small" />,
          text: "Edit",
          modalType: "edit_custom_role",
        },

        {
          icon: <Delete fontSize="small" />,
          text: "Delete",
          modalType: "delete_role",
        },
      ];
    } else if (is_editable !== 1 && is_default !== 1) {
      return [
        {
          icon: <Delete fontSize="small" />,
          text: "Delete",
          modalType: "delete_role",
        },
      ];
    } else if (is_editable !== 1 && is_default === 1) {
      return [
        {
          icon: <Edit fontSize="small" />,
          text: "Edit",
          modalType: "edit_custom_role",
        },
        // {
        //   icon: <Delete fontSize="small" />,
        //   text: "Delete",
        //   modalType: "delete_role",
        // },
      ];
    }
  };

  const newName = [
    {
      icon: <Edit fontSize="small" />,
      text: "Edit",
      modalType: "edit_custom_role",
    },
  ];
  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",

      renderCell: (props) => (
        <Typography
          sx={{ textTransform: "capitalize" }}
          className={props?.row?.is_permissionable === 1 && `title`}
          onClick={() =>
            props?.row?.is_permissionable === 1 &&
            navigate(`roles/?id=${props?.row?.id}`)
          }
        >
          {props?.row?.name}
          {console.log({ props: props?.row })}
        </Typography>
      ),
    },

    {
      flex: 0.5,
      field: "editd_at",
      headerName: "editd At",
      renderCell: (props) => (
        <Typography>{changeDateFormat(props?.row?.editd_at)}</Typography>
      ),
    },

    {
      flex: 0.5,
      field: "updated_at",
      headerName: "Updated At",
      renderCell: (props) => (
        <Typography>{changeDateFormat(props?.row?.updated_at)}</Typography>
      ),
    },

    {
      flex: 0.5,
      field: "view_permissions",
      headerName: "Permissions",
      headerAlign: "center",
      align: "center",
      renderCell: (props) => (
        <Box>
          {props?.row?.is_permissionable === 1 && (
            <Button
              sx={{ color: "#2B7476", borderColor: "#2B7476" }}
              variant="outlined"
              onClick={() => navigate(`roles/?id=${props?.row?.id}`)}
            >
              Manage Permissions
            </Button>
          )}
        </Box>
      ),
    },

    {
      flex: 0.2,
      field: "actions",
      headerName: "",
      renderCell: ({ row }) =>
        row?.is_permissionable === 1 && (
          <CustomMoreOptionButton
            items={getItems(row?.is_editable, row?.is_default)}
            handleOpenModal={handleOpen}
            row={row}
          />
        ),
    },
  ];

  const [
    deleteRole,
    {
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      data,
      error,
    },
  ] = useDeleteRoleMutation();

  const deleteRoleAction = () => {
    deleteRole({
      id: row?.id,
    });
  };

  return (
    <>
      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataGrid
            rows={rolesData?.data?.data || []}
            columns={columns}
            hidePagination={true}
            getRowClassName={(params) =>
              params?.row?.is_permissionable !== 1 && "is_default"
            }
          />
        </>
      )}

      <CustomModal
        modalTitle={"Edit custom role"}
        open={modals?.edit_custom_role}
        width={"500px"}
        handleClose={() => handleClose("edit_custom_role")}
      >
        <AddCustomRole
          handleClose={() => handleClose("edit_custom_role")}
          row={row}
        />
      </CustomModal>

      <CustomDeleteModal
        open={modals?.delete_role}
        handleClose={() => handleClose("delete_role")}
        handleConfirm={deleteRoleAction}
        isLoading={isDeleteLoading}
        success={isDeleteSuccess}
        error={error}
        successData={data}
      />
    </>
  );
};

export default RolesTable;
