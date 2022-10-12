import React, { useState } from "react";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const PrivateSide = () => {
  const navigate = useNavigate();

  const deleteFunc = function (index) {
    console.log("Delete" + index);
  };

  const editFunc = function (index) {
    navigate("/agregar-publicidad" + true + index);
  };

  var dataOriginal = [
    {
      id: 1,
      name: "Anuncio Coca-cola",
      enterprise: "Coca-cola",
      enterpriseEmail: "coca@cocacola.com",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 2,
      name: "Anuncio Pepsi",
      enterprise: "pepso",
      enterpriseEmail: "pepsi@pepsi.com",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 3,
      name: "Anuncio msi",
      enterprise: "msi",
      enterpriseEmail: "msi@msi.com",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
    {
      id: 4,
      name: "Anuncio HP",
      enterprise: "HP",
      enterpriseEmail: "hp@hp.com",
      deleteAction: deleteFunc,
      editAction: editFunc,
    },
  ];

  const [search, setSearch] = useState("");

  const [data, setData] = useState(dataOriginal);

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
      title: "Empresa",
      name: "enterprise",
      type: "text",
    },
    {
      title: "Email de la empresa",
      name: "enterpriseEmail",
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

  const handleChange = (event) => {
    setSearch(event.target.value);
    filter(event.target.value);
  };

  const filter = (text) => {    
    for (let i = 0; i < dataOriginal.length; i++) {
      if (dataOriginal[i].name.includes(text) || dataOriginal[i].id === Number(text)) {        
        setData((data) => [...data, dataOriginal[i]]);
      }
    }
  };

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
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Buscar por nombre o ID"
                      value={search}
                      onChange={handleChange}
                    />
                    <small id="name" class="form-text text-muted">
                      Buscar por nombre o ID
                    </small>
                  </div>
                </div>
              </div>
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
