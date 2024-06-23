import { Route, Routes } from "react-router-dom";
import DataGridComponent from "../components/local/dataGridComponent/DataGridComponent";
import Example from "../components/local/example/Example";
import Inputs from "../components/local/inputs/Inputs";
import NepaliDatePicker from "../components/local/nepaliDatePicker/NepaliDatePicker";
import RtkQuery from "../components/local/rtkQuery/RtkQuery";
import TreeViewComponent from "../components/local/treeView/TreeViewComponent";
import MainLayout from "../layouts";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<>Home</>} />
        <Route path="/rtk" element={<Example />} />;
        <Route path="/rtk-query" element={<RtkQuery />} />;
        <Route path="/nepali-date-picker" element={<NepaliDatePicker />} />;
        <Route path="/inputs" element={<Inputs />} />;
        <Route path="/data-grid" element={<DataGridComponent />} />;
        <Route path="/tree-view" element={<TreeViewComponent />} />;
      </Route>
    </Routes>
  );
};

export default RouteList;
