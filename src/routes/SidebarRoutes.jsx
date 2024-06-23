import { Route, Routes } from "react-router-dom";
import NotFound from "../components/common/404";
import Permissions from "../components/common/Permissions/Permissions";
import BugsFeedback from "../components/local/bugs&feedback/BugsFeedback";
import Company from "../components/local/company";
import SingleProduct from "../components/local/company/SingleCompany/SingleProduct";
import CompanyPlan from "../components/local/company/companyPlan/CompanyPlan";
import SingleFirm from "../components/local/dashboard/SingleFirm/SingleFirm";
import AccountingFirm from "../components/local/dashboard/accountingFirm";
import FirmDetails from "../components/local/dashboard/accountingFirm/FirmDetails";
import FirmClients from "../components/local/dashboard/accountingFirm/clients";
import FirmUsers from "../components/local/dashboard/accountingFirm/singleFirm/FirmUsers";
import Login from "../components/local/login";
import ResetPassword from "../components/local/login/ResetPassword";
import Owners from "../components/local/owners/Owners";
import AddPackagePage from "../components/local/packages/AddPackagePage/AddPackagePage";
import Package from "../components/local/packages/Package";
import PaymentOptionsPage from "../components/local/paymentoptions/PaymentOptionsPage";
import Sessions from "../components/local/sessions/Sessions";
import Settings from "../components/local/settings";
import SettingLayout from "../components/local/settings/SettingLayout";
import UserManagement from "../components/local/usermanagement/UserManagement";
import AllUsers from "../components/local/users/AllUsers";
import Users from "../components/local/users/Users";
import MainLayout from "../layouts";
import PrivateRoutes from "./PrivateRoutes";

const SidebarRoutes = () => {
   return (
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/" element={<MainLayout />}>
            <Route path="/packages">
               <Route index element={<Package />} />
               <Route path="add" element={<AddPackagePage />} />
               <Route path="edit" element={<AddPackagePage />} />
               <Route path="view" element={<AddPackagePage />} />
            </Route>{" "}
            <Route
               index
               element={
                  <PrivateRoutes>
                     <>Dashboard</>
                  </PrivateRoutes>
               }
            />
            <Route path="/accounting-firms">
               <Route
                  index
                  element={
                     <PrivateRoutes>
                        <AccountingFirm />
                     </PrivateRoutes>
                  }
               />
               <Route path=":id" element={<SingleFirm />} />
               <Route path=":firm_id/users" element={<FirmUsers />} />
               <Route
                  path=":firm_id/clients"
                  element={
                     <PrivateRoutes>
                        <FirmClients />
                     </PrivateRoutes>
                  }
               />
               <Route path="firm-details">
                  <Route
                     path=":firm_id/"
                     element={
                        <PrivateRoutes>
                           <FirmDetails />
                        </PrivateRoutes>
                     }
                  />
               </Route>
            </Route>
            <Route path="/institutions">
               <Route index element={<Company />} />
               <Route path=":id" element={<SingleProduct />} />
               <Route path="plan" element={<CompanyPlan />} />
               <Route
                  path=":id/company-invitations"
                  element={<Owners />}
               />
            </Route>{" "}
            <Route path="/all-users">
               <Route index element={<AllUsers />} />
            </Route>{" "}
            <Route path="/payment-options">
               <Route index element={<PaymentOptionsPage />} />
            </Route>
            <Route path="/user-management">
               <Route index element={<UserManagement />} />
               <Route path="roles" element={<Permissions />} />
            </Route>{" "}
            <Route path="/sessions">
               <Route index element={<Sessions />} />
            </Route>{" "}
            <Route path="/settings">
               <Route index element={<Settings />} />
               <Route
                  path="users"
                  element={<SettingLayout>Hello</SettingLayout>}
               />
            </Route>
            <Route path="users">
               <Route index element={<Users />} />
               {/* <Route path="permissions/:name" element={<Permissions />} /> */}
            </Route>{" "}
            {/* <Route path="owners" element={<Owners />} /> */}
            <Route
               path="/bugs"
               element={
                  <PrivateRoutes>
                     <BugsFeedback />
                  </PrivateRoutes>
               }
            />
            <Route
               path="/change-company"
               element={<>Change Company</>}
            />
         </Route>
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default SidebarRoutes;
