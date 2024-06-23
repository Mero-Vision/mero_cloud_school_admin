// import ActiveDashboardIcon from "../assets/activeIcons/dashboard.svg";
// import ActiveSettingsIcon from "../assets/activeIcons/settings.svg";
// import DashboardIcon from "../assets/icon/dashboard.svg";
// import SettingsIcon from "../assets/icon/settings.svg";

import {
  AccountBalance,
  AccountBalanceOutlined,
  Dashboard,
  DashboardOutlined,
  Settings,
  SettingsOutlined,
} from "@mui/icons-material";

export const SidebarConstants = [
   {
      header: "MAIN",
      items: [
         {
            label: "Dashboard",
            url: "/",
            icon: <DashboardOutlined />,
            activeIcon: <Dashboard style={{ color: "#4559BD" }} />,
            children: [],
         },
         // {
         //   label: "Accounting Firms",
         //   url: "/accounting-firms",
         //   icon: <DomainOutlined />,
         //   activeIcon: <Domain style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
         // {
         //   label: "Packages",
         //   url: "/packages",
         //   icon: <LoyaltyOutlined />,
         //   activeIcon: <Loyalty style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
         {
            label: "Institutions",
            url: "/institutions",
            icon: <AccountBalanceOutlined />,
            activeIcon: (
               <AccountBalance style={{ color: "#4559BD" }} />
            ),
            children: [],
         },

         //  {
         //     label: "Payment Options",
         //     url: "/payment-options",
         //     icon: <AccountBalanceOutlined />,
         //     activeIcon: (
         //        <AccountBalance style={{ color: "#4559BD" }} />
         //     ),
         //     children: [],
         //  },

         //  {
         //     label: "User management",
         //     url: "/user-management",
         //     icon: <Person2Outlined />,
         //     activeIcon: (
         //        <AccountBalance style={{ color: "#4559BD" }} />
         //     ),
         //     children: [],
         //  },

         // {
         //   label: "All Users",
         //   url: "/all-users",
         //   icon: <GroupOutlined />,
         //   activeIcon: <Group style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
         // {
         //   label: "Sessions",
         //   url: "/sessions",
         //   icon: <AccessTimeOutlined />,
         //   activeIcon: <AccessTimeFilled style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
         // {
         //   label: "Sales",
         //   url: "/sales",
         //   icon: SalesIcon,
         //   activeIcon: ActiveSalesIcon,
         //   children: [
         //     {
         //       label: "Quotations",
         //       url: "/sales/quotations",
         //     },
         //     {
         //       label: "Sales Order",
         //       url: "/sales/sales-order",
         //     },
         //     {
         //       label: "Customers",
         //       url: "/sales/customers",
         //     },
         //     {
         //       label: "Invoice",
         //       url: "/sales/invoice",
         //     },
         //   ],
         // },
         // {
         //   label: "Purchase",
         //   url: "/purchase",
         //   icon: PurchaseIcon,
         //   activeIcon: ActivePurchaseIcon,
         //   children: [
         //     {
         //       label: "Suppliers",
         //       url: "/purchase/suppliers",
         //     },
         //     {
         //       label: "Expenses",
         //       url: "/purchase/expenses",
         //     },
         //     {
         //       label: "Purchase Order",
         //       url: "/purchase/purchase-order",
         //     },
         //     {
         //       label: "Purchase Bills",
         //       url: "/purchase/purchase-bills",
         //     },
         //   ],
         // },
         // {
         //   label: "Accounts",
         //   url: "/accounts",
         //   icon: AccountsIcon,
         //   activeIcon: ActiveAccountsIcon,
         //   children: [
         //     {
         //       label: "Charts of Account",
         //       url: "/accounts/charts-of-account",
         //     },
         //     {
         //       label: "Journal Voucher",
         //       url: "/accounts/journal-voucher",
         //     },
         //   ],
         // },
         // {
         //   label: "Cash & Bank",
         //   url: "/cash-bank",
         //   icon: CashIcon,
         //   activeIcon: ActiveCashIcon,
         //   children: [
         //     {
         //       label: "Bank Accounts",
         //       url: "/cash-&-bank/bank-accounts",
         //     },
         //     {
         //       label: "Cash Accounts",
         //       url: "/cash-&-bank/cash-accounts",
         //     },
         //   ],
         // },
         // {
         //   label: "Inventory",
         //   url: "/inventory",
         //   icon: InventoryIcon,
         //   activeIcon: ActiveInventoryIcon,
         //   children: [
         //     {
         //       label: "Units of Measurement",
         //       url: "/inventory/units-of-measurement",
         //     },
         //     { label: "Product Categories", url: "/inventory/product-categories" },
         //     { label: "Products", url: "/inventory/products" },
         //   ],
         // },
         // {
         //   label: "Payroll",
         //   url: "/payroll",
         //   icon: PayrollIcon,
         //   activeIcon: ActivePayrollIcon,
         //   children: [
         //     {
         //       label: "Employees",
         //       url: "/payroll/employees",
         //     },
         //   ],
         // },
         // {
         //   label: "Reports",
         //   url: "/reports",
         //   icon: ReportsIcon,
         //   activeIcon: ActiveReportsIcon,
         //   children: [],
         // },
      ],
   },
   {
      header: "SETTINGS",
      items: [
         {
            label: "Settings",
            url: "/settings/",
            icon: <SettingsOutlined />,
            activeIcon: <Settings style={{ color: "#4559BD" }} />,
            children: [],
         },
         // {
         //   label: "Users",
         //   url: "/users",
         //   icon: <PersonOutlined />,
         //   activeIcon: <Person style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
         // {
         //   label: "Bugs & feedback",
         //   url: "/bugs",
         //   icon: <BugReportOutlined />,
         //   activeIcon: <BugReportSharp style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
         // {
         //   label: "Change Company",
         //   url: "/change-company",
         //   icon: <SyncOutlined style={{ color: "#4559BD" }} />,
         //   activeIcon: <Sync style={{ color: "#4559BD" }} />,
         //   children: [],
         // },
      ],
   },
];
