import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import { getAllCategorias } from "../../services/CategoriaService";

const CategoriaSelect = ({ formik }) => {
  const dispatch = useDispatch();
  const { categorias, fetched } = useSelector((state) => state.categorias);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllCategorias());
    }
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel
          color={
            formik.touched.categoria_id && Boolean(formik.errors.categoria_id)
              ? "error"
              : "info"
          }
          id="lblCategoriaId"
        >
          Categoria
        </InputLabel>
        <Select
          labelId="lblCategoriaId"
          name="categoria_id"
          color="info"
          value={formik.values.categoria_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.categoria_id && Boolean(formik.errors.categoria_id)
          }
          label="Categoria"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          {categorias.map((categoria) => {
            return <MenuItem value={categoria.id}>{categoria.nombre}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CategoriaSelect;
