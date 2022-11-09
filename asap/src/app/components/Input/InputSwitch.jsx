import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";

const InputSwitch = ({ formik, label, field }) => {
  return (
    <Grid item xs={12}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              required
              name={field}
              checked={formik.values[field]}
              onChange={(event) =>
                formik.setFieldValue(field, event.target.checked)
              }
            />
          }
          label={label}
        />
      </FormGroup>
    </Grid>
  );
};

export default InputSwitch;
