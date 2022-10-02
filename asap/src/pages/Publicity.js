import React from "react";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const PrivateSide = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Id",
      name: "id",
      type: "text",
    },
    {
      title: "Nombre",
      name: "name",
      type: "text",
    },
    {
      title: "Apellido",
      name: "surname",
      type: "text",
    },
    {
      title: "Edad",
      name: "age",
      type: "text",
    },
    {
      title: "Editar",
      name: "edit",
      type: "edit",
    },
    {
      title: "Eliminar",
      name: "delete",
      type: "delete",
    },
  ];

  const deleteFunc = function (index) {
    console.log("Delete" + index);
  };

  const editFunc = function (index) {
    navigate("/agregar-publicidad" + true + index);
  };

  const data = [
    {
      id: 1,
      name: "Daniel",
      surname: "Valdez",
      age: "1",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 2,
      name: "Daniel",
      surname: "Valdez",
      age: "2",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 3,
      name: "Daniel",
      surname: "Valdez",
      age: "2",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 4,
      name: "Daniel",
      surname: "Valdez",
      age: "2",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 5,
      name: "Daniel",
      surname: "Valdez",
      age: "2",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 6,
      name: "Daniel",
      surname: "Valdez",
      age: "2",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
  ];

  return (
    <>
      <div className="page-breadcrumb">
        <div className="row d-flex justify-content-between">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Publicidad
            </h4>
          </div>
          <a href={"/agregar-publicidad" + false}>
            <button className="btn btn-info">Agregar publicidad</button>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card" style={{ margin: "10px" }}>
            <div className="card-body">
              <h6 className="card-subtitle d-flex justify-content-end"></h6>
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateSide;
