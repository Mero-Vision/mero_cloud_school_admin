import {
   AddRoad,
   Domain,
   InsertChartOutlined,
   Key,
   Payment,
   Person,
} from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Drawer } from "@mui/material";
import AddCompany from "../../local/company/AddCompany";
import AddFirms from "../../local/dashboard/accountingFirm/modals/AddFirms";
import ChangeStatus from "../../local/dashboard/accountingFirm/modals/ChangeStatus";
import ResetLink from "../../local/dashboard/accountingFirm/modals/ResetLink";
import AddUsers from "../../local/dashboard/accountingFirm/singleFirm/AddUsers";
import ProductsModal from "../../local/inventory/products/ProductsModal";
import UnitsOfMeasurementsModal from "../../local/inventory/unitsOfMeasurements/UnitsOfMeasurementsModal";
import ViewPackage from "../../local/packages/ViewPackage";
import CreatePayment from "../../local/paymentoptions/forms/CreatePayment";
import EmployeesModal from "../../local/payroll/employee/EmployeesModal";
import ExpensesModal from "../../local/purchase/expenses/ExpensesModal";
import SuppliersModal from "../../local/purchase/suppliers/SuppliersModal";
import CustomersModal from "../../local/sales/customers/CustomersModal";
import AddFiscalYear from "../../local/settings/modal/AddFiscalYear";
import AddFiscalYearTax from "../../local/settings/modal/AddFiscalYearTax";
import AddAdminUsers from "../../local/users/AddAdminUsers";
import CustomDeleteModal from "../CustomModal/CustomDeleteModal";
import CustomModal from "../CustomModal/CustomModal";

const AllModals = ({
   modalType,
   open,
   value,
   handleClose,
   modalTitle,
   row,
   handleDelete,
   isLoading,
   disabled = false,
}) => {
   console.log({ modalType });
   const returnModal = () => {
      switch (modalType) {
         case "add_firm":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "Add Firm"}`}
                  icon={<Domain />}
               >
                  <AddFirms handleClose={handleClose} />
               </CustomModal>
            );

         case "add_company":
         case "edit_company":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Add Institute`}
                  icon={<InsertChartOutlined />}
                  width={"1000px"}
               >
                  <AddCompany
                     type={value}
                     handleClose={handleClose}
                     row={row}
                     disabled={disabled}
                  />
               </CustomModal>
            );

         case "edit_firm":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? `Edit Firm`}`}
                  icon={<Domain />}
               >
                  <AddFirms handleClose={handleClose} row={row} />
               </CustomModal>
            );
         case "add_users":
            return (
               <>
                  <CustomModal
                     open={open}
                     handleClose={handleClose}
                     modalTitle={`Add User`}
                     icon={<InsertChartOutlined />}
                     width={"400px"}
                  >
                     <AddUsers handleClose={handleClose} />
                  </CustomModal>
               </>
            );
         case "add_admin_users":
            return (
               <>
                  <CustomModal
                     open={open}
                     handleClose={handleClose}
                     modalTitle={`Add User`}
                     icon={<InsertChartOutlined />}
                     width={"400px"}
                  >
                     <AddAdminUsers handleClose={handleClose} />
                  </CustomModal>
               </>
            );

         case "add_fiscal_year":
         case "edit_fiscal_year": {
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle}`}
                  icon={<Domain />}
               >
                  <AddFiscalYear
                     handleClose={handleClose}
                     row={row}
                  />
               </CustomModal>
            );
         }
         case "add_fiscal_year_tax": {
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle}`}
                  icon={<Domain />}
               >
                  <AddFiscalYearTax handleClose={handleClose} />
               </CustomModal>
            );
         }
         case "delete_firm":
            return (
               <CustomDeleteModal
                  open={open}
                  handleClose={handleClose}
                  handleConfirm={handleDelete}
                  isLoading={isLoading}
               />
            );
         case "change_password":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Change Password`}
                  icon={<Key />}
               ></CustomModal>
            );
         case "reset_link":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Reset Link`}
                  icon={<Key />}
                  width={"500px"}
                  height={"230px"}
               >
                  {/* <ChangeClientPassword /> */}
                  <ResetLink />
               </CustomModal>
            );
         case "manage_permission":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Manage Permission`}
                  icon={<Key />}
               >
                  Manage Permission
                  {/* <ChangeClientPassword /> */}
               </CustomModal>
            );
         case "change_client_status":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Change Status`}
                  icon={<AddRoad />}
                  width={"500px"}
                  height={"280px"}
               >
                  {/* <AddBankModal handleClose={handleClose} /> */}
                  <ChangeStatus />
               </CustomModal>
            );
         case "suppliers":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Supplier`}
                  icon={<ShoppingCartIcon />}
                  width={"500px"}
               >
                  {
                     <SuppliersModal
                        type={value}
                        handleClose={handleClose}
                     />
                  }
               </CustomModal>
            );
         case "expenses":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Expenses`}
                  icon={<PriceChangeOutlinedIcon />}
                  width={"500px"}
               >
                  {
                     <ExpensesModal
                        type={value}
                        handleClose={handleClose}
                     />
                  }
               </CustomModal>
            );
         case "customers":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Customer`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <CustomersModal
                        type={value}
                        handleClose={handleClose}
                     />
                  }
               </CustomModal>
            );
         case "employees":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Employee`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <EmployeesModal
                        type={value}
                        handleClose={handleClose}
                     />
                  }
               </CustomModal>
            );
         case "products":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Product`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <ProductsModal
                        type={value}
                        handleClose={handleClose}
                     />
                  }
               </CustomModal>
            );
         case "units-of-measurements":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Unit of Measurement`}
                  icon={<Person />}
                  width={"500px"}
               >
                  {
                     <UnitsOfMeasurementsModal
                        type={value}
                        handleClose={handleClose}
                     />
                  }
               </CustomModal>
            );

         case "view-package":
            return (
               <Drawer
                  anchor={"right"}
                  open={open}
                  onClose={() => handleClose()}
               >
                  <ViewPackage handleClose={handleClose} data={row} />
               </Drawer>
            );

         case "add-payment-options":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`Add payment option`}
                  icon={<Payment />}
                  width={"500px"}
                  // height={"230px"}
               >
                  <CreatePayment
                     handleClose={handleClose}
                     row={row}
                  />
               </CustomModal>
            );

         default:
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Account`}
                  icon={<PeopleIcon />}
               >
                  NICE{" "}
               </CustomModal>
            );
      }
   };
   return <div>{returnModal()}</div>;
};

export default AllModals;
