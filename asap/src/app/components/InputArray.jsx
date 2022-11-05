import { Grid } from "@mui/material";
import ChipInput from "material-ui-chip-input";

const InputArray = ({ formik, label, field }) => {
  const handleAddChip = (chip) => {
    const oldData = formik.values[field];
    oldData.push(chip);
  };

  const handleDeleteChip = (chip, index) => {
    const oldData = formik.values[field];
    const newData = oldData?.filter((item, i) => i !== index);
    formik.setFieldValue("palabras_clave", newData);
  };

  return (
    <Grid item xs={12}>
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
    </Grid>
  );
};

export default InputArray;
