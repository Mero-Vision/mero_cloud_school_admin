import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
   useCompanyModifyPackageMutation,
   useCompanySubscribePackageMutation,
   useGetSingleCompanyQuery,
} from "../../../../apis/companyApi";
import { useGetPackageQuery } from "../../../../apis/packageApi";
import useQuery from "../../../../hooks/useQuery";
import {
   findInArray,
   stringifyData,
} from "../../../../utils/helpers";
import CustomBackButton from "../../../common/CustomButton/CustomBackButton";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomPaper from "../../../common/CustomPaper/CustomPaper";
import { CustomSearchSelect } from "../../../common/CustomSelects/CustomSearchSelect";
import CurrentPlan from "./CurrentPlan";

const CompanyPlan = () => {
   const { query: id } = useQuery();
   const {
      control,
      formState: { errors },
      watch,
      reset,
      setValue,
      handleSubmit,
   } = useForm();

   const [
      subscribe,
      {
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         error,
         data: successData,
      },
   ] = useCompanySubscribePackageMutation();
   const [
      companyModifyPackage,
      {
         isLoading: isEditLoading,
         isSuccess: isEditSuccess,
         error: editError,
         data: editSuccessData,
      },
   ] = useCompanyModifyPackageMutation();
   const { data, isFetching } = useGetSingleCompanyQuery({ id });
   const { data: packages, isFetching: isPackageFetching } =
      useGetPackageQuery();

   const singleData = useMemo(() => data?.data, [data?.data]);

   const PACKAGES_DATA = useMemo(() => {
      const actualPackage =
         packages?.data?.data?.length > 0 &&
         findInArray(
            packages?.data?.data,
            "id",
            singleData?.package?.id
         );
      const companyPlan = {
         ...singleData?.package?.pivot,
         period: Number(singleData?.package?.pivot?.period),
         value: singleData?.package?.id + "Plan",
         id: singleData?.package?.id + "Plan",
         package_id: singleData?.package?.id + "Plan",
         label: `Current Plan (${actualPackage?.name})`,
         period_prices: actualPackage?.period_prices,
      };
      const data = packages?.data?.data?.map((item) => {
         return {
            label: `${item?.name} (${item?.period_prices?.length} Duration Plans)`,
            value: item?.id,
            ...item,
         };
      });
      return singleData?.package
         ? [companyPlan, ...(data || [])]
         : data || [];
   }, stringifyData([packages?.data, singleData?.package]));

   const currentPlan =
      PACKAGES_DATA?.length > 0 &&
      PACKAGES_DATA?.find((item) => item?.id === watch("package_id"));

   console.log({ package_id: watch() });

   console.log({ currentPlan, PRICING_DATA });

   useEffect(() => {
      console.log({ "SINGLE==[AGEC": singleData?.package });
      if (singleData?.package) {
         reset({
            ...singleData?.package?.pivot,
            period: Number(singleData?.package?.pivot?.period),
            package_id: singleData?.package?.id + "Plan",
         });
      }
   }, [singleData?.package]);

   useEffect(() => {
      if (watch("period")) {
         const price =
            PRICING_DATA?.length > 0 &&
            findInArray(PRICING_DATA, "period", watch("period"));
         setValue("price", price?.price);
      } else {
         setValue("price", "");
      }
   }, [PRICING_DATA, watch("period"), watch("package_id")]);

   useEffect(() => {
      if (currentPlan) {
         reset({
            package_id: watch("package_id"),
            ...(currentPlan || {}),
         });
      }
   }, [currentPlan, watch("package_id")]);

   useEffect(() => {
      if (currentPlan) {
         setValue("period", PRICING_DATA?.[0]?.value);
      }
   }, [currentPlan]);

   const onSubmit = (data) => {
      const arrayToDelete = [
         "period_prices",
         "label",
         "value",
         "status",
      ];
      arrayToDelete?.map((item) => delete data?.[item]);
      const finalData = {
         // ...data,
         company_id: id,
         package_id: Number(
            String(data?.package_id)?.replace("Plan", "")
         ),
         period: data?.period ?? null,
         // price: data?.price,
         no_of_branch: data?.no_of_branch,
         discount: data?.discount ?? null,
         user: data?.user,
         table: data?.table,
         payment_integration: data?.payment_integration,
         // room: data?.room ?? null,
      };

      console.log({ finalData, data });

      singleData?.package
         ? companyModifyPackage(finalData)
         : subscribe(finalData);
   };

   if (isFetching) {
      return <CustomLoader />;
   }

   // console.log({ period });

   return (
      <Box>
         <CustomBackButton />
         <CustomPaper
            modalTitle={`Company: ${singleData?.business_name} (${singleData?.display_name})`}
         >
            <form
               onSubmit={(e) => {
                  e.stopPropagation();
                  return handleSubmit(onSubmit)(e);
               }}
            >
               <Grid container spacing={2.5}>
                  <Grid item container xs={9} spacing={2.5}>
                     <Grid item xs={12}>
                        <CustomSearchSelect
                           control={control}
                           errors={errors}
                           name={"package_id"}
                           title="Package"
                           key={PACKAGES_DATA}
                           data={PACKAGES_DATA || []}
                           placeholder={"Select a Package"}
                           required
                        />
                     </Grid>
                     <Grid item xs={3}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="user"
                           title={"No. of users"}
                           placeholder={"10"}
                           type="number"
                           required
                           min={-1}
                        />
                     </Grid>
                     <Grid item xs={3}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="table"
                           title={"No. of table"}
                           placeholder={"3000"}
                           type="number"
                           min={-1}
                           required
                        />
                     </Grid>
                     {/* <Grid item xs={3}>
                <CustomInput
                  control={control}
                  errors={errors}
                  name="menu_item"
                  title={"No. of menu item"}
                  placeholder={"300"}
                  type="number"
                  min={-1}
                  required
                />
              </Grid> */}
                     <Grid item xs={3}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="no_of_branch"
                           title={"No of branch"}
                           placeholder={"10"}
                           type="number"
                           required
                        />
                     </Grid>
                     <Grid item xs={3}>
                        <CustomSearchSelect
                           control={control}
                           errors={errors}
                           name="period"
                           title={"Period"}
                           required
                           data={PRICING_DATA || []}
                           key={PRICING_DATA}
                           placeholder={"Duration"}
                        />
                     </Grid>
                     <Grid item xs={3}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="price"
                           title={"Price"}
                           placeholder={"10000"}
                           type="number"
                           required
                           disabled
                        />
                     </Grid>

                     <Grid item xs={12}>
                        <CustomButton
                           loading={isPostLoading || isEditLoading}
                           error={error || editError}
                           success={isPostSuccess || isEditSuccess}
                           successData={
                              successData || editSuccessData
                           }
                        />
                     </Grid>
                  </Grid>
                  <Grid item container xs={3}>
                     {singleData?.package && (
                        <Grid item xs={12}>
                           <Box width={"max-content"}>
                              <Typography className="title">
                                 CURRENT PLAN:
                              </Typography>
                              {/* <PlanCard row={singleData?.package} /> */}
                              <CurrentPlan
                                 props={{ row: singleData }}
                              />
                           </Box>
                        </Grid>
                     )}
                  </Grid>
               </Grid>
            </form>
         </CustomPaper>
      </Box>
   );
};

export default CompanyPlan;
