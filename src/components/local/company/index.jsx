import {
   Add,
   ApartmentOutlined,
   //  CancelOutlined,
   //  CheckBoxOutlined,
   Delete,
   Edit,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   useDeleteCompanyMutation,
   useGetAllCompanyQuery,
} from "../../../apis/companyApi";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import AllModals from "../../common/AllModals/AllModals";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomModal from "../../common/CustomModal/CustomModal";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import AddCompanyAdmin from "./AddCompanyAdmin";

const data = [
   {
      label: "All",
      value: "all",
      icon: <ApartmentOutlined />,
   },
   // {
   //   label: "Pending",
   //   value: "pending",
   //   icon: <HourglassBottomOutlined />,
   // },
   //  {
   //     label: "Active",
   //     value: "active",
   //     icon: <CheckBoxOutlined />,
   //  },
   //  {
   //     label: "Inactive",
   //     value: "inactive",
   //     icon: <CancelOutlined />,
   //  },
];

const items = (props) => [
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
   {
      icon: <Add fontSize="small" />,
      text: props?.row?.owner ? "Update Owner" : "Add Owner",
      modalType: "add_owner",
   },
];

function ActionComponent(props) {
   const [openModal, setOpenModal] = useState(false);
   const [modalType, setModalType] = useState("");
   const [
      deleteItem,
      { isLoading, isSuccess, error, data: successData },
   ] = useDeleteCompanyMutation();
   const handleConfirm = () => {
      deleteItem(props?.row?.id);
   };
   const handleOpenModal = (modalType) => {
      setOpenModal(true);
      setModalType(modalType);
   };
   const handleCloseModal = () => {
      setOpenModal(false);
   };

   return (
      <Box>
         <CustomMoreOptionButton
            items={items(props)}
            handleOpenModal={handleOpenModal}
         />

         <CustomModal
            open={openModal && modalType === "add_owner"}
            handleClose={() => handleCloseModal()}
            modalTitle={`Add Owner`}
            width={"400px"}
         >
            <AddCompanyAdmin
               row={props?.row}
               handleClose={() => handleCloseModal()}
            />{" "}
         </CustomModal>
         <AllModals
            modalType={"edit_company"}
            handleClose={() => handleCloseModal()}
            open={openModal && modalType === "edit"}
            row={props?.row}
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
      </Box>
   );
}

const RenderName = ({ props }) => {
   const navigate = useNavigate();
   return (
      <>
         <Box
            className="title"
            style={{ fontWeight: "600", cursor: "pointer" }}
            onClick={() => navigate(`companies?id=${props?.row?.id}`)}
         >
            {props?.row?.institute_display_name ||
               props?.row?.institute_name}
         </Box>
      </>
   );
};
const Company = () => {
   const { search_keyword = "" } = useSelector(
      (state) => state?.utils
   );
   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });
   const navigate = useNavigate();
   const { value, Tabs } = useTabs({
      data,
      button: (
         <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen("add_company")}
         >
            Add New
         </Button>
      ),
   });
   const params = {
      page: paginationModel?.page + 1,
      pagination_limit: paginationModel?.pageSize,
      // paginate: 1,
      search_keyword: search_keyword,
      status: value === "all" ? "" : value,
   };
   const {
      data: companyData,
      isFetching,
      isSuccess,
   } = useGetAllCompanyQuery(params, { skip: !value });
   const [deleteCompany, { isSuccess: isDeleteSuccess, isLoading }] =
      useDeleteCompanyMutation();

   // const [getCompanyUser] = useGetCompanyUserQuery();

   console.log({ companyData });

   const { handleClose, handleOpen, modals, row } = useModal();

   const handleDelete = (row) => {
      deleteCompany(row?.id);
   };

   useEffect(() => {
      if (isDeleteSuccess) {
         handleClose("delete_company");
      }
   }, [isDeleteSuccess]);

   const columns = [
      {
         flex: 1.5,
         field: "institute_name",
         headerName: "Name",
         renderCell: (props) => <RenderName props={props} />,
      },

      // {
      //    flex: 1,
      //    field: "expiry_date",
      //    headerName: "Plan Expiry Date",
      //    renderCell: (props) => (
      //       <Box>
      //          {props?.row?.package?.pivot?.expiry_date
      //             ? changeDateFormat(
      //                  props?.row?.package?.pivot?.expiry_date
      //               )
      //             : ""}
      //          {props?.row?.package?.pivot?.expiry_date && (
      //             <Typography
      //                sx={{
      //                   color: true ? "red" : "green",
      //                   fontSize: "10px",
      //                }}
      //             >
      //                {isAfterDate(
      //                   props?.row?.package?.pivot?.expiry_date
      //                )
      //                   ? "Expired "
      //                   : "Expires "}
      //                {getDateDifference(
      //                   props?.row?.package?.pivot?.expiry_date
      //                )}
      //                {/* Expires in {moment("2024-1-").to(moment(new Date()), true)} */}
      //             </Typography>
      //          )}
      //       </Box>
      //    ),
      // },
      {
         flex: 1.3,
         field: "address",
         headerName: "Address",
      },
      {
         flex: 1.5,
         field: "primary_email",
         headerName: "Email/Phone",
         renderCell: (props) => (
            <Box>
               <Box>{props?.row?.primary_email}</Box>
               <Box>{props?.row?.primary_phone}</Box>
            </Box>
         ),
      },

      {
         flex: 1.5,
         field: "Owner",
         headerName: "Owner",
         renderCell: (props) => (
            <Typography>
               {props?.row?.owner?.name ?? "-"} <br />(
               {props?.row?.owner?.email})
            </Typography>
         ),
      },
      // {
      //   flex: 1,
      //   field: "vat_number",
      //   headerName: "VAT/PAN No.",
      // },
      // {
      //    flex: 0.7,
      //    field: "type",
      //    headerName: "Status",
      //    renderCell: (props) => (
      //       <CompanyStatus props={props} data={data?.slice(1)} />
      //    ),
      //    sortable: false,
      //    editable: false,
      //    disableColumnMenu: true,
      // },

      // {
      //    flex: 1.5,
      //    field: "plan_details",
      //    headerName: "Plan",
      //    renderCell: (props) => <CurrentPlan props={props} hide />,
      //    sortable: false,
      //    editable: false,
      //    disableColumnMenu: true,
      // },

      // {
      //   flex: 1,
      //   field: "invitation",
      //   headerName: "Invitations",
      //   sortable: false,
      //   editable: false,
      //   disableColumnMenu: true,
      //   renderCell: (props) => (
      //     <>
      //       <Link to={`${props?.row?.id}/company-invitations`}>
      //         <Button variant="outlined">View invitations</Button>
      //       </Link>
      //     </>
      //   ),
      // },

      {
         flex: 0.1,
         field: "action",
         headerName: "",
         renderCell: ActionComponent,
         sortable: false,
         editable: false,
         disableColumnMenu: true,
      },
   ];
   return (
      <>
         {Tabs}
         {isFetching && <CustomLoader />}

         {!isFetching && isSuccess && (
            <CustomDataGrid
               rows={companyData?.data || []}
               columns={columns}
               tabsData={data}
               paginationModel={paginationModel}
               setPaginationModel={setPaginationModel}
               pageInfo={companyData?.data?.meta}
            />
         )}

         <AllModals
            modalType={"add_company"}
            handleClose={() => handleClose("add_company")}
            open={modals?.add_company}
         />
      </>
   );
};

export default Company;
