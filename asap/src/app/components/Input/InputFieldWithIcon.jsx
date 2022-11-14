import { Grid, TextField } from "@mui/material";
import React from "react";

const InputFieldWithIcon = ({
  formik,
  label,
  field,
  type,
  inputProps,
  required = true,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        color="info"
        variant="outlined"
        type={type}
        label={label}
        name={field}
        required={required}
        value={formik.values[field]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
        InputProps={inputProps}
      />
    </Grid>
  );
};

export default InputFieldWithIcon;
