import Accounting from "../assets/reports/accounting.png";
import Inventory from "../assets/reports/inventory.png";
import Payable from "../assets/reports/payable.png";
import Purchase from "../assets/reports/purchase.png";
import ReceiveMail from "../assets/reports/receive-mail.png";
import System from "../assets/reports/system.png";
import Tax from "../assets/reports/taxes.png";

export const ReportConstants = [
  {
    header: "Accounting",
    icon: Accounting,
    items: [
      { url: "transaction-list" },
      { url: "journal-report" },
      { url: "general-ledger-summary" },
      { url: "detail-general-ledger" },
      { url: "gl-master-report" },
      { url: "trial-balance" },
      { url: "income-statement" },
      { url: "balance-sheet" },
    ],
  },
  {
    header: "Receivable",
    icon: ReceiveMail,
    items: [
      { url: "invoice-age" },
      { url: "customer-statement" },
      { url: "customer-ageing-summary" },
      { url: "customer-receivable-summary" },
    ],
  },
  {
    header: "Payable",
    icon: Payable,
    items: [
      { url: "supplier-payable-summary" },
      { url: "supplier-ageing-summary" },
      { url: "purchase-bill-age" },
      { url: "supplier-statement" },
    ],
  },
  {
    header: "Sales Report",
    icon: Accounting,
    items: [
      { url: "sales-by-customer" },
      { url: "sales-by-item" },
      { url: "sales-by-customer-monthly" },
      { url: "sales-by-item-monthly" },
      { url: "sales-master-report" },
    ],
  },
  {
    header: "Purchase Report",
    icon: Purchase,
    items: [
      { url: "purchase-by-supplier" },
      { url: "purchase-by-item" },
      { url: "purchase-by-supplier-monthly" },
      { url: "purchase-by-item-monthly" },
      { url: "purchase-master-report" },
    ],
  },
  {
    header: "Tax Report",
    icon: Tax,
    items: [
      { url: "sales-register" },
      { url: "sales-register-new" },
      { url: "purchase-register" },
      { url: "purchase-register-new" },
      { url: "vat-summary-report" },
      { url: "tds-report" },
      { url: "tds-report-advance" },
      { url: "annex-13-report" },
      { url: "annex-5-materialised-view-report" },
    ],
  },
  {
    header: "Inventory Report",
    icon: Inventory,
    items: [
      { url: "inventory-position" },
      { url: "inventory-movement" },
      { url: "inventory-ledger" },
      { url: "inventory-master-report" },
    ],
  },
  {
    header: "System Report",
    icon: System,
    items: [{ url: "activity-log" }, { url: "user-log" }],
  },
];
