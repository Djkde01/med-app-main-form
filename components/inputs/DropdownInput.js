import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const options = [
  {
    label: "Hialucorp",
    value: "Hialucorp",
  },
  {
    label: "Metacorp",
    value: "Metacorp",
  },
];

export const DropdownInput = ({ name, control, label }) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value} label={label} required>
            {generateSelectOptions()}
          </Select>
        )}
      />
    </FormControl>
  );
};
