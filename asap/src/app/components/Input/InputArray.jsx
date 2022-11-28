import { FormControl, Grid } from "@mui/material";
import ChipInput from "material-ui-chip-input";

const InputArray = ({ formik, label, field }) => {
  const handleAddChip = (chip) => {
    const oldData = Object.assign([], formik.values[field]);
    oldData.push(chip);
    formik.setFieldValue(field, oldData);
  };

  const handleDeleteChip = (chip, index) => {
    const oldData = formik.values[field];
    const newData = oldData?.filter((item, i) => i !== index);
    formik.setFieldValue(field, newData);
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <ChipInput
          fullWidth
          color="info"
          variant="outlined"
          label={label}
          value={formik.values[field]}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
          placeholder="Escribe y presiona enter para agregar"
        />
      </FormControl>
    </Grid>
  );
};

export default InputArray;
