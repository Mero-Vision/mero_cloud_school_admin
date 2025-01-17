import React from "react";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
const columns = [
  { flex: 1, field: "id", headerName: "ID" },
  {
    flex: 1,
    field: "firstName",
    headerName: "First name",
    editable: true,
  },
  {
    flex: 1,
    field: "lastName",
    headerName: "Last name",
    editable: true,
  },
  {
    flex: 1,
    field: "age",
    headerName: "Age",
    type: "number",
    editable: true,
  },
  {
    flex: 1,
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 39 },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DataGridComponent = () => {
  return (
    <div>
      <CustomDataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataGridComponent;
