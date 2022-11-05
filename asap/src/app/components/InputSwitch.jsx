import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";

const InputSwitch = ({ formik, label, field }) => {
  return (
    <Grid item xs={12}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              name={field}
              checked={formik.values[field]}
              onChange={formik.handleChange}
            />
          }
          label={label}
        />
      </FormGroup>
    </Grid>
  );
};

export default InputSwitch;
