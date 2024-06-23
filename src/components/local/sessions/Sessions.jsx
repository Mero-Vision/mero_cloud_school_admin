import { AccessTime, Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDeletePackageMutation,
  useGetPackageQuery,
} from "../../../apis/packageApi";
import useTabs from "../../../hooks/useTabs";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";

const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Edit",
    modalType: "edit",
    permission: "assets-update",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete",
    permission: "assets-delete",
  },
];

function ActionComponent({ props }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteItem, { isLoading, isSuccess, error, data: successData }] =
    useDeletePackageMutation();
  const handleConfirm = () => {
    deleteItem({ id: props?.row?.id });
  };
  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleNavigate = () => {
    navigate(`edit?id=${props?.row?.id}`);
  };

  useEffect(() => {
    modalType === "edit" && handleNavigate();
  }, [openModal, modalType === "edit"]);
  return (
    <Box>
      <CustomMoreOptionButton items={items} handleOpenModal={handleOpenModal} />

      <CustomDeleteModal
        open={openModal && modalType === "delete"}
        handleClose={() => handleCloseModal()}
        isLoading={isLoading}
        handleConfirm={handleConfirm}
        success={isSuccess}
        error={error}
        successData={successData}
      />
    </Box>
  );
}

const data = [
  {
    label: "Sessions",
    value: "sessions",
    icon: <AccessTime />,
  },
];

const Sessions = () => {
  const navigate = useNavigate();
  const { search_keyword = "" } = useSelector((state) => state?.utils);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { value, Tabs } = useTabs({
    data,
  });

  const params = {
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
    search_keyword,
  };
  const {
    data: accountHead,
    isSuccess: isAccountSuccess,
    isFetching: isAccountFetching,
  } = useGetPackageQuery(params);

  const columns = [
    { flex: 1, field: "name", headerName: "User Name" },
    { flex: 1, field: "user", headerName: "IP Address" },
    { flex: 1, field: "transaction", headerName: "User Agent" },
    { flex: 1, field: "product", headerName: "Session Start" },
    { flex: 1, field: "storage", headerName: "Last Activity" },
    { flex: 1, field: "storage", headerName: "Session End" },
    //  {
    //    flex: 0.4,
    //    field: "action",
    //    headerName: "Action",
    //    sortable: false,
    //    editable: false,
    //    renderCell: (props) => <ActionComponent props={props} />,
    //    headerAlign: "center",
    //    align: "center",
    //    disableColumnMenu: true,
    //  },
  ];

  return (
    <div>
      {Tabs}
      {isAccountFetching && <CustomLoader />}

      {!isAccountFetching && isAccountSuccess && (
        <CustomDataGrid
          rows={accountHead?.data?.data || []}
          columns={columns}
          Tabs={Tabs}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageInfo={accountHead?.data?.meta}
        />
      )}
    </div>
  );
};

export default Sessions;
