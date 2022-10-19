import { Grid, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";

const Cargo = ({ formik, roles }) => {
  return (
    <Formik>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          <TextField
            color="info"
            fullWidth
            label="Rol Id"
            name="id_rol"
            variant="outlined"
            value={formik.values.id_rol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
    </Formik>
  );
};

export default Cargo;
