import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
   usePostPackageMutation,
   useUpdatePackageMutation,
} from "../../../../apis/packageApi";
import useQuery from "../../../../hooks/useQuery";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomCheckbox } from "../../../common/CustomCheckbox/CustomCheckbox";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import PackagePrices from "./PackagePrices";

const AddPackageForm = ({ isViewOnly }) => {
   const navigate = useNavigate();
   const { query: id } = useQuery("id");
   const [
      post,
      {
         error,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         data: successData,
      },
   ] = usePostPackageMutation();
   const [
      edit,
      {
         error: editError,
         isLoading: isEditLoading,
         isSuccess: isEditSuccess,
         data: editSuccessData,
      },
   ] = useUpdatePackageMutation();
   const {
      control,
      formState: { errors },
      setValue,
      handleSubmit,
      watch,
   } = useFormContext({});
   useEffect(() => {
      (isPostSuccess || isEditSuccess) && navigate(`/packages`);
   }, [isEditSuccess, isPostSuccess]);

   const onSubmit = (data) => {
      const finalData = {
         ...data,
         id,
         // is_trial: data?.is_trial ? 1 : 0,
         // type: "restaurant",
      };

      id ? edit(finalData) : post(finalData);
   };

   return (
      <Box>
         <Box>
            <fieldset
               style={{ border: "none" }}
               disabled={isViewOnly}
            >
               <form
                  onSubmit={(e) => {
                     e.stopPropagation();
                     return handleSubmit(onSubmit)(e);
                  }}
               >
                  <Grid
                     container
                     spacing={2.5}
                     sx={{ paddingRight: "10rem" }}
                  >
                     <Grid item xs={12}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="name"
                           title={"Package Name"}
                           placeholder={"Premium"}
                           required
                        />
                     </Grid>
                     <Grid item xs={4}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="user"
                           title={"No. of users"}
                           placeholder={"10"}
                           type="number"
                           min={-1}
                           required
                        />
                     </Grid>

                     <Grid item xs={4}>
                        <CustomInput
                           control={control}
                           errors={errors}
                           name="table"
                           title={"No. of table(s)"}
                           placeholder={"10"}
                           type="number"
                           min={-1}
                           required
                        />
                     </Grid>

                     <Grid item xs={4}></Grid>
                     {/* <Grid item xs={4}>
                <CustomInput
                  control={control}
                  errors={errors}
                  name="menu_item"
                  title={"No. of menu item(s)"}
                  placeholder={"2"}
                  type="number"
                  min={-1}
                  required
                />
              </Grid> */}

                     <Grid item xs={3}>
                        <Box key={watch("payment_integration")}>
                           <CustomCheckbox
                              control={control}
                              errors={errors}
                              name="payment_integration"
                              label="Payment integration"
                           />
                        </Box>
                     </Grid>

                     <Grid item xs={3}>
                        <Box key={watch("is_trial")}>
                           <CustomCheckbox
                              control={control}
                              errors={errors}
                              name="is_trial"
                              label="Is Trial"
                           />
                        </Box>
                     </Grid>

                     <Grid item xs={3}>
                        <Box key={watch("is_recommended")}>
                           {" "}
                           <CustomCheckbox
                              control={control}
                              errors={errors}
                              name="is_recommended"
                              label="Is Recommended"
                           />
                        </Box>
                     </Grid>

                     <Grid item xs={12}>
                        <PackagePrices />
                     </Grid>

                     <Grid item xs={12}>
                        {!isViewOnly && (
                           <CustomButton
                              loading={isPostLoading || isEditLoading}
                              error={error || editError}
                              success={isPostSuccess || isEditSuccess}
                              successData={
                                 successData || editSuccessData
                              }
                           />
                        )}
                     </Grid>
                  </Grid>
               </form>
            </fieldset>
         </Box>
      </Box>
   );
};

export default AddPackageForm;
