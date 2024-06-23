import { yupResolver } from "@hookform/resolvers/yup";
import { LoyaltyOutlined, Visibility } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useGetSinglePackageQuery } from "../../../../apis/packageApi";
import useQuery from "../../../../hooks/useQuery";
import CustomBackButton from "../../../common/CustomButton/CustomBackButton";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomPaper from "../../../common/CustomPaper/CustomPaper";
import AddPackageForm from "./AddPackageForm";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const AddPackagePage = ({}) => {
  const { query: id } = useQuery("id");
  const { pathname } = useLocation();
  const defaultValues = {};
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { setValue, reset, watch } = methods;
  const params = { id };
  const { data: singleData, isFetching } = useGetSinglePackageQuery(params, {
    skip: !id,
  });

  const SingleData = useMemo(() => singleData?.data, [singleData?.data]);
  useEffect(() => {
    if (SingleData) {
      reset({ ...SingleData, is_trial: SingleData?.is_trial ? true : false });
    }
  }, [SingleData]);

  const isViewOnly = pathname === "/packages/view";

  if (isFetching) {
    return <CustomLoader />;
  }
  return (
    <FormProvider {...methods}>
      <CustomBackButton />
      <Box>
        {" "}
        <CustomPaper
          modalTitle={
            isViewOnly ? `View Package` : `${id ? "Edit" : "Add"} Package`
          }
          icon={isViewOnly ? <Visibility /> : <LoyaltyOutlined />}
        >
          <AddPackageForm isViewOnly={isViewOnly} />
        </CustomPaper>
      </Box>
    </FormProvider>
  );
};

export default AddPackagePage;
