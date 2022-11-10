import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import { getAllRoles } from "../../services/RolService";

const RolSelect = ({ formik }) => {
  const dispatch = useDispatch();
  const { roles, fetched } = useSelector((state) => state.roles);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllRoles());
    }
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel color="info" id="lblRolId" required>
          Rol
        </InputLabel>
        <Select
          required
          labelId="lblRolId"
          name="rol_id"
          color="info"
          value={formik.values.rol_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rol_id && Boolean(formik.errors.rol_id)}
          label="Rol"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          {roles.map((rol) => {
            return <MenuItem value={rol.id}>{rol.nombre}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default RolSelect;
