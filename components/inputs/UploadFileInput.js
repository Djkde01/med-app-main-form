import { Button, Input } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const UploadFileInput = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Button variant="outlined" component="label">
          {label}
          <Input
            accept="application/pdf"
            id={name}
            type="file"
            onChange={onChange}
            value={value}
            style={{ display: "none" }}
          />
          {` (${value}) `}
        </Button>
      )}
    />
  );
};

export default UploadFileInput;
