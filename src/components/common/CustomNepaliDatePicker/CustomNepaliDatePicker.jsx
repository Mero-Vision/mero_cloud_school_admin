import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Controller } from "react-hook-form";

const CustomNepaliDatePicker = ({ name, label, control, rules, ...rest }) => {
  return (
    <>
      <div>
        {label && (
          <label htmlFor={name} style={{ fontSize: "12px", fontWeight: "500" }}>
            {String(label)?.toUpperCase()}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              <NepaliDatePicker {...field} {...rest} />

              {error && <span style={{ color: "red" }}>{error.message}</span>}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CustomNepaliDatePicker;
