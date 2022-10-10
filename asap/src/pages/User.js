import React from "react";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const Users = () => {
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
            title: "Nivel  Académico",
            name: "nivel",
            type: "text",
        },
        {
            title: "Semestre",
            name: "semestre",
            type: "text",
        },
        {
            title: "Edad ",
            name: "edad",
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
        navigate("/agregar-usuario" + true + index);
    };

    const data = [
        {
            id: 1,
            name: "Angel Ricardo",
            nivel: "Arquitectura",
            semestre: "7 semestre",
            edad: "23",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 2,
            name: "Jairo Esteban",
            nivel: "Software",
            semestre: "3 semestre",
            edad: "23",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 3,
            name: "Carlos Cruz Gomez",
            nivel: "Civil",
            semestre: "7 semestre",
            edad: "23",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 4,
            name: "Azucena Reyes Santiago",
            nivel: "Arquitectura",
            semestre: "7 semestre",
            edad: "23",
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
                            Usuarios
                        </h4>
                    </div>
                    <a href={"/agregar-usuario" + false}>
                        <button className="btn btn-info">Agregar usuario</button>
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
                                            placeholder="Buscar por nombre o Matricula"
                  
                                        />
                                        <small id="name" class="form-text text-muted">
                                            Buscar por nombre o Matricula
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

export default Users;
