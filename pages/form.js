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
  Checkbox
} from "@mui/material";
import firebase from "firebase";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {NotificationModal, NotificationModal2} from "../components/shareds/NotificationModal";
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
    phone_number: undefined,
    biopolimer: undefined,
    application_date: null,
    health_issues: null,
    symptoms_start: null,
    case_desc: null,
    application_file: null,
    check: null,
  };
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Nombre completo es requerido"),
    phone_number: Yup.string().required("Número de teléfono es requerido")
    .test({
      name: 'max',
      message: 'Número de teléfono inválido.',
      test: (value) => value == null || /^(\d{10,10})$/.test(value),
    }),
    check: Yup.mixed().required("Accepta los terminos y condiciones"),
    biopolimer: Yup.mixed()
      .oneOf(["Hialucorp", "Metacorp", "Otro", "No sabe"], "Elija el bioplíomero aplicado")
      .required("Elija el bioplíomero aplicado"),
    application_date: Yup.date()
      .required("Fecha requerida")
      .typeError("Fecha inválida")
      .max(todayDate, "Fecha inválida"),
    health_issues: Yup.mixed().oneOf(["yes", "no"]).required("Campo requerido"),
    symptoms_start: Yup.date()
      .typeError("Fecha inválida")
      .max(todayDate, "Fecha inválida"),
    case_desc: Yup.mixed()
      .nullable()
      .required("Campo requerido")
      .test("maxLenght", `Escriba maximo 500 caracteres`, (value)  => {
        return value==null || value.length <= 500;
      }) ,
    
    application_file: Yup.mixed()
      .nullable()
      .test("fileSize", "El tamaño del archivo es muy grande", (value) => {
        if(!value) return true;
        return value && value[0].size <= 3000000;
      })
      .test("type", "Solo se pueden subir archivos .pdf", (value) => {
        if(!value) return true;
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
          <TextField
            required
            id="phone_number"
            name="phone_number"
            label="Número de teléfono"
            fullWidth
            margin="dense"
            variant="outlined"
            {...register("phone_number")}
            error={errors.phone_number ? true : false}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            style={{
              margin: "10px auto",
              color: "red",
            }}
          >
            {errors.phone_number?.message}
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
              <MenuItem value="Otro">Otro</MenuItem>
              <MenuItem value="No sabe">No sabe</MenuItem>
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
              name="symptoms_start"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  onChange={onChange}
                  value={value}
                  label="Ingrese fecha"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("symptoms_start")}
                      error={errors.symptoms_start ? true : false}
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
              {errors.symptoms_start?.message}
            </Typography>
          </LocalizationProvider>
          <TextField
            required
            id="case_desc"
            name="case_desc"
            label="Cuéntanos tu caso en 500 caracteres"
            fullWidth
            multiline="true"
            rows="4"
            margin="dense"
            variant="outlined"
            {...register("case_desc")}
            error={errors.case_desc ? true : false}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            style={{
              margin: "10px auto",
              color: "red",
            }}
          >
            {errors.case_desc?.message}
          </Typography>
          <Typography variant="h6">Reporte quirúrgico (opcional)</Typography>
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
          <FormControlLabel 
            id="check" 
            name="check"
            fullWidth
            {...register("check")}
            control={
              <Checkbox/>
            } 
            label ={
              <p 
                className="decoration-solid under underline text-sky-400 hover:text-sky-800 text-xl" 
                onClick={
                  () => setShowModal(true)
                }>
                Términos y condiciones.
              </p>
            }
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            style={{
              margin: "10px auto",
              color: "red",
            }}
          >
            {errors.check?.message}
          </Typography>
        </Box>
        <button 
          className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold" 
          onClick={handleSubmit(onSubmit)}>
          Enviar
        </button>
        <NotificationModal
          isOpen={snackbarStatus}
          onClose={() => {
            setSnackbarStatus(false);
          }}
        />
      </Paper>
      {showModal? (
        <>
        <NotificationModal2
          handleClose={() => {
            setShowModal(false);
          }}
        />
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
