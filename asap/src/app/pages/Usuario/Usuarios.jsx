import { useCallback, useEffect, useState, useContext } from "react";
import SuperDataTable from "../../components/SuperDataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import UsuarioService from "../../services/UsuarioService";

import CrearUsuario from "./Crear/CrearUsuario";
import EditarUsuario from "./Editar/EditarUsuario";

import { AuthContext } from "../../context/AuthContext";
import { useStyles } from "../../utils/utils";

const Usuarios = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const [itemId, setItemId] = useState(-1);
  const [itemToEdit, setItemToEdit] = useState({ id: -1 });

  const [usuarios, setUsuarios] = useState([]);
  const [fetched, setFetched] = useState(false);

  const headers = [
    {
      name: "",
      label: "No.",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <center>{rowIndex}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        customBodyRender: (data, type, row) => {
          return <center>{data}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
    {
      name: "correo",
      label: "Correo",
      options: {
        customBodyRender: (data, type, row) => {
          return <center>{data}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
    {
      name: "telefono",
      label: "Teléfono",
      options: {
        customBodyRender: (data, type, row) => {
          return <center>{data}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
    {
      name: "rol",
      label: "Rol",
      options: {
        customBodyRender: (data, type, row) => {
          return <center>{data["nombre"]}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
  ];

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const notify = useCallback(
    (action, message) => {
      setFetched(!fetched);
      const configuration = {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      };
      action === "success"
        ? toast.success(message, configuration)
        : toast.error(message, configuration);
    },
    [fetched]
  );

  useEffect(() => {
    if (!fetched) {
      UsuarioService.getAllUsers()
        .then((response) => {
          setUsuarios(response);
          setFetched(true);
        })
        .catch((error) => {
          setFetched(true);
        });
    }
  }, [fetched, notify]);

  useEffect(() => {
    if (itemToEdit && itemToEdit.id !== -1) {
      handleOpenEdit();
    }
  }, [itemToEdit]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => usuarios[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      const id = idsToDelete[0];
      if (currentUser.id === id) {
        notify("error", "No se puede eliminar este usuario");
      } else {
        UsuarioService.deleteUser(id)
          .then((response) => {
            if (response.message) {
              notify("success", response.message);
            } else {
              notify("error", response.error);
            }
          })
          .catch((error) => {
            notify("error", error);
          });
      }
    } else if (idsToDelete.length >= 1) {
      UsuarioService.deleteManyUser(idsToDelete)
        .then((response) => {
          if (response.message) {
            notify("success", response.message);
          } else {
            notify("error", response.error);
          }
        })
        .catch((error) => {
          notify("error", error);
        });
    }
  };

  const editAction = (ids) => {
    const idsToDelete = ids.data.map((d) => usuarios[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      const id = idsToDelete[0];
      const found = usuarios.find((usuario) => usuario.id === Number(id));
      setItemId(id);
      setItemToEdit(found);
      handleOpenEdit();
    } else {
      toast.error("Solo se puede editar un elemento a la vez", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Usuarios - ASAP</title>
        <meta name="Usuarios" content="Usuarios registrados" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Usuarios
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleOpenCreate}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <SuperDataTable
        data={usuarios}
        headers={headers}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearUsuario
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <EditarUsuario
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        usuario={itemToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Usuarios;
