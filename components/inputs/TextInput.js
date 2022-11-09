import { Controller, useFormContext } from "react-hook-form";
import { TextField, FormControl, FormLabel, Typography } from "@mui/material";

export const TextInputField = ({ name, control, label }) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            error={error}
            onChange={onChange}
            value={value}
            label={label}
            fullWidth
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};
