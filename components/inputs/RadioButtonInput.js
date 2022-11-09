import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const options = [
  {
    label: "Sí",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

export const RadioButtonInput = ({ name, control, label }) => {
  const { register } = useForm();
  const generateRadioOptions = () => {
    return options.map((singleOption, index) => (
      <FormControlLabel
        key={index}
        value={singleOption.value}
        label={singleOption.label}
        {...register("health_issues", { required: true })}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup value={value} onChange={onChange} label={label}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
