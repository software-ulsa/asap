import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import { getAllCarreras } from "../../services/CarreraService";

const CarreraSelect = ({ formik }) => {
  const dispatch = useDispatch();
  const { carreras, fetched } = useSelector((state) => state.carreras);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllCarreras());
    }
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel
          color={
            formik.touched.carrera_id && Boolean(formik.errors.carrera_id)
              ? "error"
              : "info"
          }
          id="lblCarreraId"
        >
          Carrera
        </InputLabel>
        <Select
          labelId="lblCarreraId"
          name="carrera_id"
          color="info"
          value={formik.values.carrera_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.carrera_id && Boolean(formik.errors.carrera_id)}
          label="Carrera"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          {carreras.map((carrera) => {
            return <MenuItem value={carrera.id}>{carrera.nombre}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CarreraSelect;
