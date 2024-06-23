import {
   Add,
   Delete,
   Edit,
   Loyalty,
   Visibility,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   useDeletePackageMutation,
   useGetPackageQuery,
} from "../../../apis/packageApi";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import AllModals from "../../common/AllModals/AllModals";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";

const items = [
   {
      icon: <Visibility fontSize="small" />,
      text: "View",
      modalType: "view-package",
      permission: "assets-update",
   },
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
   const [
      deleteItem,
      { isLoading, isSuccess, error, data: successData },
   ] = useDeletePackageMutation();
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
         <CustomMoreOptionButton
            items={items}
            handleOpenModal={handleOpenModal}
         />

         <CustomDeleteModal
            open={openModal && modalType === "delete"}
            handleClose={() => handleCloseModal()}
            isLoading={isLoading}
            handleConfirm={handleConfirm}
            success={isSuccess}
            error={error}
            successData={successData}
         />

         {console.log({ modalType })}

         <AllModals
            open={openModal}
            handleClose={() => handleCloseModal()}
            row={props?.row}
            modalType={modalType}
         />
      </Box>
   );
}

const data = [
   {
      label: "Packages",
      value: "package",
      icon: <Loyalty />,
   },
];

const Package = () => {
   const navigate = useNavigate();
   const { search_keyword = "" } = useSelector(
      (state) => state?.utils
   );
   const { open, modals, handleClose, handleOpen, row } = useModal();
   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });
   const { value, Tabs } = useTabs({
      data,
      button: (
         <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("add")}
         >
            Add New
         </Button>
      ),
   });

   const params = {
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
      paginate: 1,
      search_keyword,
   };
   const {
      data: packagesData,
      isSuccess: isPackageSuccess,
      isFetching: isPackageFetching,
   } = useGetPackageQuery(params);

   console.log({ packagesData });

   const columns = [
      { flex: 1, field: "name", headerName: "Package Name" },
      { flex: 1, field: "user", headerName: "Users" },
      { flex: 1, field: "table", headerName: "Table" },
      {
         flex: 1,
         field: "payment_integration",
         headerName: "Payment Intregation",
      },
      {
         flex: 1,
         field: "type",
         headerName: "Package Type",
         renderCell: (props) => <PackageType data={props?.row} />,
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
         {isPackageFetching && <CustomLoader />}

         {!isPackageFetching && isPackageSuccess && (
            <CustomDataGrid
               rows={packagesData?.data?.data || []}
               columns={columns}
               Tabs={Tabs}
               paginationModel={paginationModel}
               setPaginationModel={setPaginationModel}
               pageInfo={packagesData?.data?.meta}
            />
         )}
      </div>
   );
};

export default Package;

export const PackageType = ({ data }) => {
   return (
      <>
         {data?.is_trial
            ? "Trial Package"
            : data?.is_recommended
            ? "Recommended Package"
            : "Normal Package"}
      </>
   );
};
