import React from "react";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";

const FirmPaymentTable = () => {
  return (
    <>
      <CustomDataGrid
        rows={recentPayments || []}
        columns={columns}
        // Tabs={clientData}
      />
    </>
  );
};

export default FirmPaymentTable;

const recentPayments = [
  {
    id: 1,
    paymentDate: "2023-08-01",
    amount: 500,
    status: "Completed",
    paymentMethod: "Credit Card",
    receiptNumber: "CC12345",
  },
  {
    id: 2,
    paymentDate: "2023-07-29",
    amount: 750,
    status: "Completed",
    paymentMethod: "PayPal",
    receiptNumber: "PP67890",
  },
  {
    id: 3,
    paymentDate: "2023-07-27",
    amount: 300,
    status: "Failed",
    paymentMethod: "Debit Card",
    failureReason: "Insufficient Funds",
  },
  {
    id: 4,
    paymentDate: "2023-07-25",
    amount: 1000,
    status: "Completed",
    paymentMethod: "Bank Transfer",
    receiptNumber: "BT54321",
  },
  {
    id: 5,
    paymentDate: "2023-07-21",
    amount: 200,
    status: "Completed",
    paymentMethod: "Cash",
  },
];

const columns = [
  {
    flex: 1,
    field: "receiptNumber",
    headerName: "Receipt Number",
  },
  {
    flex: 1,
    field: "paymentDate",
    headerName: "Payment Date",
  },
  {
    flex: 1,
    field: "amount",
    headerName: "Amount",
  },

  {
    flex: 1,
    field: "paymentMethod",
    headerName: "Payment Method",
    sortable: false,
  },

  {
    flex: 1,
    field: "status",
    headerName: "Status",
  },

  {
    flex: 1,
    field: "action",
    headerName: "Actions",
  },
];
