import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { DatePickerInput } from "../components/inputs/DatePicker";
import { DropdownInput } from "../components/inputs/DropdownInput";
import { RadioButtonInput } from "../components/inputs/RadioButtonInput";
import { TextInputField } from "../components/inputs/TextInput";
import UploadFileInput from "../components/inputs/UploadFileInput";

const MainForm = () => {
  const todayDate = new Date();
  const todayDay = todayDate.getDay();
  const todayMonth = todayDate.getMonth();
  const todayYear = todayDate.getFullYear();

  const formattedDate =
    todayMonth < 10
      ? `${todayYear}-0${todayMonth}-${todayDay}`
      : `${todayYear}-${todayMonth}-${todayDay}`;

  const defaultValues = {
    full_name: undefined,
    biopolimer: "",
    application_date: formattedDate,
    health_issues: "yes",
    syntoms_start: formattedDate,
    application_file: "",
  };

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const hasHealthIssues = watch("application_file");
  console.log(watch("application_file"));
  const onSubmit = (data) => console.log(data);

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <Typography variant="h3">Registro de historia clinica</Typography>
      <Typography variant="h6">Datos principales</Typography>
      <TextInputField
        name="full_name"
        control={control}
        label="Nombre completo*"
      />
      <DropdownInput
        name="biopolimer"
        control={control}
        label="Nombre del biopolimero que le fue aplicado*"
      />
      <DatePickerInput
        name="application_date"
        control={control}
        label="Fecha exacta (O aproximada) en la que se le fue aplicado*"
      />
      <RadioButtonInput
        name="health_issues"
        control={control}
        label="¿Ha sufrido problemas de salud por esto?*"
      />
      <DatePickerInput
        name="syntoms_start"
        control={control}
        label="Fecha desde que empezó a presentar problemas (Si aplica)"
      />
      <Typography variant="h6">
        Subir reporte aplicación de biopolimero
      </Typography>
      <UploadFileInput
        name="application_file"
        control={control}
        label=" Reporte (PDF)"
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Enviar
      </Button>
      <Button variant="outlined" color="error" onClick={reset(defaultValues)}>
        Limpiar
      </Button>
      <Typography variant="p">
        Al dar click en &apos;Enviar&apos; está aceptando nuestros términos y
        condiciones
      </Typography>
    </Paper>
  );
};

export default MainForm;
