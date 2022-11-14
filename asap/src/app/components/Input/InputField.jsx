import { Grid, TextField } from "@mui/material";
import React from "react";

const InputField = ({
  formik,
  label,
  field,
  type,
  required = true,
  multiline = false,
  minRows = 1,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        color="info"
        multiline={multiline}
        minRows={minRows}
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
      />
    </Grid>
  );
};

export default InputField;
