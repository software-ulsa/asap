import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import { getAllEspecialidades } from "../../services/EspecialidadService";

const EspecialidadesSelect = ({ formik }) => {
  const dispatch = useDispatch();
  const { especialidades, fetched } = useSelector(
    (state) => state.especialidades
  );

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllEspecialidades());
    }
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel color="info" id="lblEspecialidadId" required>
          Especialidad
        </InputLabel>
        <Select
          required
          labelId="lblEspecialidadId"
          name="especialidad_id"
          color="info"
          value={formik.values.especialidad_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Especialidad"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          {especialidades.map((especialidad) => {
            return (
              <MenuItem value={especialidad.id}>{especialidad.nombre}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default EspecialidadesSelect;
