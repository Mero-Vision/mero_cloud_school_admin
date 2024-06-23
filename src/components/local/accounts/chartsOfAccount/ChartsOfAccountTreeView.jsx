import React from "react";
import { useGetAccountHeadTreeQuery } from "../../../../apis/chartsOfAccountApi";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomTreeView from "../../../common/CustomTreeView/CustomTreeView";
import ChartsTreeViewContent from "./ChartsTreeViewContent";

const ChartsOfAccountTreeView = () => {
  const {
    data: treeData,
    isError: isAccountError,
    isLoading: isAccountLoading,
    isSuccess: isAccountSuccess,
    isFetching: isAccountFetching,
  } = useGetAccountHeadTreeQuery();
  return (
    <div>
      {" "}
      {(isAccountLoading || isAccountFetching) && <CustomLoader />}
      {isAccountSuccess && (
        <CustomTreeView
          data={treeData?.data || []}
          CustomContent={ChartsTreeViewContent}
        />
      )}
    </div>
  );
};

export default ChartsOfAccountTreeView;
