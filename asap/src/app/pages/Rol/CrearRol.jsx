import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Formik, Form } from "formik";

const CrearRol = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar rol</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent>
        <Formik
          initialValues={{ nombre: "", descripcion: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container rowGap={2}>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Box paddingBottom={2} paddingRight={2}>
          <Button
            style={{ marginRight: 10 }}
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Agregar
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CrearRol;
