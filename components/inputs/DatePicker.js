import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
const DATE_FORMAT = "dd-MMM-yy";

export const DatePickerInput = ({ name, control, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="h6">{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            label="Ingrese fecha"
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};
