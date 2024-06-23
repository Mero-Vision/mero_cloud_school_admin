import React from "react";
import { TREE_DATA } from "../../../../constants/constants";
import CustomTreeView from "../../../common/CustomTreeView/CustomTreeView";
import TreeViewContent from "./TreeViewContent";

const TreeViewComponent = () => {
  return (
    <div>
      <CustomTreeView data={TREE_DATA} CustomContent={TreeViewContent} />
    </div>
  );
};

export default TreeViewComponent;
