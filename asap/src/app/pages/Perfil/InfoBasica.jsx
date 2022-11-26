import {
  CalendarMonthRounded,
  ContactPhoneRounded,
  Person3Rounded,
  Person4Rounded,
  PersonRounded,
  WcRounded,
} from "@mui/icons-material";
import { Grid, InputAdornment } from "@mui/material";

import InputFieldWithIcon from "../../components/Input/InputFieldWithIcon";
import SexoSelect from "../../components/Select/SexoSelect";

const InfoBasica = ({ formik }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <InputFieldWithIcon
        formik={formik}
        field="nombre"
        label="Nombre"
        type="text"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonRounded />
            </InputAdornment>
          ),
        }}
      />
      <InputFieldWithIcon
        formik={formik}
        field="ape_paterno"
        label="Apellido paterno"
        type="text"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person4Rounded />
            </InputAdornment>
          ),
        }}
      />
      <InputFieldWithIcon
        formik={formik}
        field="ape_materno"
        label="Apellido materno"
        type="text"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person3Rounded />
            </InputAdornment>
          ),
        }}
      />
      <InputFieldWithIcon
        formik={formik}
        field="fecha_nac"
        label="Fecha de nacimiento"
        type="date"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarMonthRounded />
            </InputAdornment>
          ),
        }}
      />
      <SexoSelect
        formik={formik}
        startAdornment={
          <WcRounded sx={{ marginRight: 1, color: "rgba(0, 0, 0, 0.54)" }} />
        }
      />
      <InputFieldWithIcon
        formik={formik}
        field="telefono"
        label="Teléfono móvil"
        type="text"
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContactPhoneRounded />
            </InputAdornment>
          ),
        }}
      />
      <InputFieldWithIcon
        formik={formik}
        field="password"
        label="Nueva contraseña"
        type="password"
        required={false}
        inputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContactPhoneRounded />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default InfoBasica;
