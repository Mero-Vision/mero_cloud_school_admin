import { Add, Delete, Edit, LockOutlined } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Box, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  useDeleteAccountHeadMutation,
  useGetAccountHeadQuery,
} from "../../../../apis/chartsOfAccountApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomModal from "../../../common/CustomModal/CustomModal";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import ChartsOfAccountTreeView from "./ChartsOfAccountTreeView";

const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Edit",
    modalType: "edit",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete",
  },
];

const ActionComponent = ({ props }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [handleDelete] = useDeleteAccountHeadMutation();
  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      {props?.row?.editable ? (
        <CustomMoreOptionButton
          items={items}
          handleOpenModal={handleOpenModal}
        />
      ) : (
        <LockOutlined fontSize="small" />
      )}

      <CustomModal
        open={openModal && modalType === "edit"}
        handleClose={() => handleCloseModal()}
        modalTitle={`Edit`}
      >
        edit
        <pre>{JSON.stringify(props?.row, null, 2)}</pre>
      </CustomModal>
      <CustomModal
        open={openModal && modalType === "delete"}
        handleClose={() => handleCloseModal()}
        modalTitle={`DELETE`}
      >
        <Button onClick={() => handleDelete({ id: props?.row?.id })}>
          DELETE{" "}
        </Button>
      </CustomModal>
    </Box>
  );
};

const GetParent = ({ props, data }) => {
  const PARENT_GROUP = useMemo(() => {
    const findData = data?.find(
      (item) => Number(item?.id) === Number(props?.row?.parent_id)
    );
    return findData?.name ?? "-";
  }, [props?.row?.parent_id, data]);
  return <>{PARENT_GROUP}</>;
};

const data = [
  {
    label: "Approved",
    value: "approved",
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    label: "Draft",
    value: "draft",
    icon: <EditNoteOutlinedIcon />,
  },
];

const ChartsOfAccount = () => {
  const { modals, handleOpen, handleClose } = useModal();
  const { treeView, value, Tabs } = useTabs({
    isAccount: true,
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add")}
      >
        Add New
      </Button>
    ),
  });

  const params = {
    status: value,
  };
  const {
    data: accountHead,
    isError: isAccountError,
    isLoading: isAccountLoading,
    isSuccess: isAccountSuccess,
    isFetching: isAccountFetching,
  } = useGetAccountHeadQuery(params);

  const columns = [
    { flex: 1, field: "code", headerName: "Account Code" },
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },
    {
      flex: 1,
      field: "account_type",
      headerName: "Account Type",
    },
    {
      flex: 1,
      field: "parent_group",
      headerName: "Parent Group",
      value,
      renderCell: (props) => (
        <GetParent props={props} data={accountHead?.data} />
      ),
    },

    {
      flex: 0.4,
      field: "action",
      headerName: "Action",
      sortable: false,
      editable: false,
      renderCell: (props) => <ActionComponent props={props} />,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
    },
  ];

  return (
    <div>
      {Tabs}
      {(isAccountLoading || isAccountFetching) && <CustomLoader />}

      {treeView ? (
        <ChartsOfAccountTreeView />
      ) : (
        isAccountSuccess && (
          <CustomDataGrid
            rows={accountHead?.data || []}
            columns={columns}
            Tabs={Tabs}
          />
        )
      )}

      <AllModals
        modalType={"charts-of-account"}
        open={modals?.add}
        handleClose={() => handleClose("add")}
        value={value}
      />
    </div>
  );
};

export default ChartsOfAccount;
