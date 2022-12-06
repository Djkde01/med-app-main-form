import React, { useState } from "react";

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import firebase from "firebase/app";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import NotificationModal from "../components/shareds/NotificationModal";
import { Container } from "@mui/system";

/*
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
*/

const settings = ["Registro historia clínica", "Términos & Condiciones"];

const MainForm = () => {
  const AuthUser = useAuthUser();

  console.log(AuthUser);
  const todayDate = new Date();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const defaultValues = {
    full_name: undefined,
    biopolimer: "Hialucorp",
    application_date: todayDate,
    health_issues: "yes",
    syntoms_start: todayDate,
    //application_file: "",
  };
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Nombre completo es requerido"),
    biopolimer: Yup.mixed()
      .oneOf(["Hialucorp", "Metacorp"])
      .required("Elija el bioplíomero aplicado"),
    application_date: Yup.date()
      .max(todayDate, "Fecha inválida")
      .required("Fecha de aplicación requerida"),
    health_issues: Yup.mixed().oneOf(["yes", "no"]).required("Campo requerido"),
    syntoms_start: Yup.date().max(todayDate, "Fecha inválida"),
    /* 
    application_file: Yup.mixed()
      .required("Historia clínica requerida")
      .test("fileSize", "El tamaño del archivo es muy grande", (value) => {
        return value && value[0].size <= 3000000;
      })
      .test("type", "Solo se pueden subir archivos .pdf", (value) => {
        return value && value[0].type === "application/pdf";
      }),
      */
  });
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  const [selectedFile, setSelectedFile] = useState("No seleccionado");

  const handleSelectedFile = (event) => {
    console.log(event);
    setSelectedFile(event.target.files[0].name);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    setSnackbarStatus(true);
    /*
    db.collection("entries")
      .add(data)
      .then(setSnackbarStatus(true))
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
      */
  };

  console.log("Rendered form");
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: "flex",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Acción grupo biopolimeros
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={AuthUser.email} src={AuthUser.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => firebase.auth().signOut()}>
                  <Typography textAlign="center">Cerrar sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px 300px",
        }}
      >
        <Box px={3} py={2}>
          <Typography variant="h3">Registro de historia clinica</Typography>
          <Typography variant="h6">Datos principales</Typography>
          <TextField
            required
            id="full_name"
            name="full_name"
            label="Nombre completo"
            fullWidth
            margin="dense"
            variant="outlined"
            {...register("full_name")}
            error={errors.full_name ? true : false}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            style={{
              margin: "10px auto",
              color: "red",
            }}
          >
            {errors.full_name?.message}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="biopolimer">
              Nombre del biopolimero que le fue aplicado
            </InputLabel>
            <Select
              required
              id="biopolimer"
              name="biopolimer"
              label="Nombre del biopolimero que le fue aplicado"
              defaultValue="Hialucorp"
              {...register("biopolimer")}
              error={errors.biopolimer ? true : false}
            >
              <MenuItem value="Hialucorp">Hialucorp</MenuItem>
              <MenuItem value="Metacorp">Metacorp</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="inherit"
            color="textSecondary"
            style={{
              margin: "10px auto",
              color: "red",
            }}
          >
            {errors.biopolimer?.message}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography variant="h6">Fecha de aplicación</Typography>
            <Controller
              name="application_date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  onChange={onChange}
                  value={value}
                  label="Ingrese fecha"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("application_date")}
                      error={errors.application_date ? true : false}
                    />
                  )}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              style={{
                margin: "10px auto",
                color: "red",
              }}
            >
              {errors.application_date?.message}
            </Typography>
          </LocalizationProvider>
          <FormControl>
            <FormLabel id="health_issues">
              ¿Ha sufrido problemas de salud por esto?
            </FormLabel>
            <Controller
              name="health_issues"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  value={value}
                  onChange={onChange}
                  label="¿Ha sufrido problemas de salud por esto?"
                >
                  <FormControlLabel
                    value="yes"
                    label="Sí"
                    {...register("health_issues")}
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="no"
                    label="No"
                    {...register("health_issues")}
                    control={<Radio />}
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Typography
            variant="inherit"
            color="textSecondary"
            style={{
              margin: "10px auto",
              color: "red",
            }}
          >
            {errors.health_issues?.message}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography variant="h6">Fecha de inicio de síntomas</Typography>
            <Controller
              name="syntoms_start"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  onChange={onChange}
                  value={value}
                  label="Ingrese fecha"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("syntoms_start")}
                      error={errors.syntoms_start ? true : false}
                    />
                  )}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              style={{
                margin: "10px auto",
                color: "red",
              }}
            >
              {errors.syntoms_start?.message}
            </Typography>
          </LocalizationProvider>
          {/*
        <Typography variant="h6">Historia clinica</Typography>
        <Button variant="contained" component="label">
          Subir archivo (.PDF 3MB) - {selectedFile}
          <input
            type="file"
            hidden
            name="application_file"
            accept="application/pdf"
            onInput={(e) => handleSelectedFile(e)}
            {...register("application_file")}
          />
        </Button>
        <Typography
          variant="inherit"
          color="textSecondary"
          style={{
            margin: "10px auto",
            color: "red",
          }}
        >
          {errors.application_file?.message}
        </Typography>
          */}
        </Box>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Enviar
        </Button>
        <Typography variant="p">
          Al dar click en &apos;Enviar&apos; está aceptando nuestros términos y
          condiciones
        </Typography>
        <NotificationModal
          isOpen={snackbarStatus}
          onClose={() => {
            setSnackbarStatus(false);
          }}
        />
      </Paper>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return { props: {} };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(MainForm);
