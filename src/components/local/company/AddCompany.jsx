import {
   useCreateCompanyMutation,
   useUpdateCompanyMutation,
} from "../../../apis/companyApi";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";

const AddCompany = ({ handleClose, row, disabled }) => {
   const [
      createCompany,
      {
         error,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         data: successData,
      },
   ] = useCreateCompanyMutation();

   const [
      updateCompany,
      {
         error: editError,
         isLoading: isEditLoading,
         isSuccess: isEditSuccess,
         data: editSuccessData,
      },
   ] = useUpdateCompanyMutation();

   const validationSchema = yup.object().shape({
      institute_name: yup.string().required("Name is required"),
      institute_display_name: yup
         .string()
         .required("Display name is required"),
      address: yup.string().required("Address is required"),
      primary_email: yup
         .string()
         .email("Invalid email address")
         .required("Primary email is required"),
      pan_no: yup
         .number()
         .positive("Vat/PAN No. must be a positive number"),
      // registration_number: yup
      //    .number()
      //    .positive("Registration No. must be a positive number"),
   });
   const {
      control,
      formState: { errors },
      handleSubmit,
      watch,
      reset,
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   useEffect(() => {
      if (row) {
         reset({
            ...row,
         });
      }
   }, [row]);

   const onSubmit = (values) => {
      const data = {
         ...values,
      };
      row
         ? updateCompany({ id: row?.id, data: data })
         : createCompany(data);
      // console.log({ "SUBMIT--VALUE": values });
      // const formData = new FormData();
      // const servies_id_object = {};
      // const service_ids = values?.service_ids?.map(
      //    (service_id, index) => ({
      //       [`service_ids[${index}]`]: service_id,
      //    })
      // );

      // service_ids?.length > 0 &&
      //    service_ids?.map((item) =>
      //       Object.keys(item)?.map(
      //          (key) => (servies_id_object[key] = item?.[key])
      //       )
      //    );

      // const finalValues = {
      //    ...values,
      //    accounting_firm_id: Number(values?.accounting_firm_id) || "",
      //    // status: values?.status || "pending",
      //    company_image: values?.company_image?.[0] ?? "",
      //    is_tax: values?.is_tax ? "active" : "inactive",
      //    ...servies_id_object,
      // };

      // delete finalValues.image;

      // String(watch("company_image"))?.startsWith("https") &&
      //    delete finalValues.company_image;
      // finalValues &&
      //    Object?.keys(finalValues)?.map((key) =>
      //       formData.append(key, finalValues?.[key] ?? "")
      //    );

      // row && formData?.append("_method", "PATCH");

      // row
      //    ? updateCompany({ id: row?.id, data: formData })
      //    : createCompany(formData);
   };

   console.log({ "row=>": row });

   useEffect(() => {
      if (isPostSuccess || isEditSuccess) {
         handleClose();
      }
   }, [isPostSuccess, isEditSuccess]);

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box
               sx={
                  disabled && {
                     pointerEvents: "none",
                     opacity: 0.8,
                  }
               }
            >
               <Grid container spacing={3}>
                  {/* <Grid item xs={4}>
                <CustomSearchSelect
                  name={"accounting_firm_id"}
                  control={control}
                  errors={errors}
                  title="Accounting Firm"
                  data={accounting_firm_options ?? []}
                />
              </Grid> */}
                  <Grid item xs={4}>
                     <CustomInput
                        name="institute_name"
                        control={control}
                        errors={errors}
                        title={"Institute Name"}
                        required
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <CustomInput
                        name="institute_display_name"
                        control={control}
                        errors={errors}
                        title={"Institute Display Name"}
                        required
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <CustomInput
                        name="primary_phone_no"
                        control={control}
                        errors={errors}
                        title={"Primary Phone"}
                        type="number"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <CustomInput
                        name="primary_email"
                        control={control}
                        errors={errors}
                        title={"Primary Email"}
                        type="email"
                        required
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <CustomInput
                        name="address"
                        control={control}
                        errors={errors}
                        title={"Address"}
                        required
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <CustomInput
                        name="institute_esd_date"
                        control={control}
                        errors={errors}
                        type="date"
                        title={"Institute Established Date"}
                     />
                  </Grid>

                  <Grid item xs={6}>
                     <CustomInput
                        name="pan_no"
                        control={control}
                        errors={errors}
                        title={"PAN No."}
                        type="number"
                     />
                  </Grid>

                  <Grid item xs={6}>
                     <CustomInput
                        name="website"
                        control={control}
                        errors={errors}
                        title={"Website"}
                     />
                  </Grid>

                  {/* <Grid item xs={12}>
                        <CustomFileUpload
                           control={control}
                           errors={errors}
                           name="company_image"
                           buttonName={"Upload Logo"}
                        />

                        {console.log({
                           "COMPANY-IMAGE": watch("company_image"),
                        })}
                        <Box
                           display={"flex"}
                           flexWrap={"wrap"}
                           mt={2}
                        >
                           <Box>
                              {watch("company_image") && (
                                 <img
                                    style={{
                                       height: "200px",
                                       width: "200px",
                                       objectFit: "cover",
                                    }}
                                    src={
                                       String(
                                          watch("company_image")
                                       )?.startsWith("https")
                                          ? row?.company_image
                                          : URL.createObjectURL(
                                               watch(
                                                  "company_image"
                                               )?.[0]
                                            )
                                    }
                                 />
                              )}
                           </Box>
                        </Box>
                     </Grid> */}
               </Grid>

               <CustomButton
                  loading={isPostLoading || isEditLoading}
                  error={error || editError}
                  success={isPostSuccess || isEditSuccess}
                  successData={successData || editSuccessData}
               />
            </Box>
         </form>
      </>
   );
};

export default AddCompany;
