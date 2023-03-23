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
import firebase from "firebase";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import NotificationModal from "../components/shareds/NotificationModal";
import { Container } from "@mui/system";

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
    biopolimer: undefined,
    application_date: null,
    health_issues: null,
    syntoms_start: null,
    application_file: null,
  };
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Nombre completo es requerido"),
    biopolimer: Yup.mixed()
      .oneOf(["Hialucorp", "Metacorp"], "Elija el bioplíomero aplicado")
      .required("Elija el bioplíomero aplicado"),
    application_date: Yup.date()
      .typeError("Fecha de aplicación inválida")
      .required("Fecha de aplicación requerida")
      .max(todayDate, "Fecha inválida"),
    health_issues: Yup.mixed().oneOf(["yes", "no"]).required("Campo requerido"),
    syntoms_start: Yup.date()
      .max(todayDate, "Fecha inválida")
      .typeError("Fecha de aplicación inválida"),

    application_file: Yup.mixed()
      .nullable()
      .required("Historia clínica requerida")
      .test("fileSize", "El tamaño del archivo es muy grande", (value) => {
        return value && value[0].size <= 3000000;
      })
      .test("type", "Solo se pueden subir archivos .pdf", (value) => {
        return value && value[0].type === "application/pdf";
      }),
  });
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState("No seleccionado");
  const [fileUrl, setFileUrl] = useState(null);

  const handleSelectedFile = (event) => {
    setSelectedFile(event.target.files[0]);
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

  const onSubmit = async (data) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(AuthUser.email);
    fileRef
      .put(selectedFile)
      .then(() => {
        firebase
          .firestore()
          .collection("entries")
          .doc(AuthUser.email)
          .set({
            ...data,
            application_file: fileRef.toString(),
          })
          .then(() => {
            setSnackbarStatus(true);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
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
                minHeight: 30,
                minWidth: 100,
                display: "flex",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Acción Biopolimeros
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
                <MenuItem onClick={() => { setShowModal(true); setAnchorElUser(null);} }>
                  <Typography textAlign="center">Términos y Condiciones</Typography>
                </MenuItem>
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
          maxWidth: "500px",
          width: "90%",
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px auto",
        }}
      >
        <Box px={3} py={2}>
          <Typography variant="h3">Registro</Typography>
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
              defaultValue="Seleccione"
              {...register("biopolimer")}
              error={errors.biopolimer ? true : false}
            >
              <MenuItem value="Seleccione">Seleccione</MenuItem>
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
          <Typography variant="h6">Reporte quirúrgico</Typography>
          <Button variant="contained" component="label">
            Subir archivo (.PDF 3MB) - {selectedFile.name}
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
        </Box>
        <button 
          className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold" 
          onClick={handleSubmit(onSubmit)}>
          Enviar
        </button>
        <Typography variant="p">
          Al dar click en &quot;Enviar&quot; está aceptando nuestros 
          <a className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" onClick={() => setShowModal(true)}> términos y condiciones</a>.
        </Typography>
        <NotificationModal
          isOpen={snackbarStatus}
          onClose={() => {
            setSnackbarStatus(false);
          }}
        />
      </Paper>
      {showModal? (
        <>
        <div
          className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl text-slate-500">
                  Términos y condiciones
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ): null}
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
