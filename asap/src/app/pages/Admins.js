import React from "react";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const Admins = () => {
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
            title: "Correo",
            name: "correo",
            type: "text",
        },
        {
            title: "Cargo",
            name: "cargo",
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
        navigate("/agregar-administrador" + true + index);
    };

    const data = [
        {
            id: 1,
            name: "Angel Ricardo",
            correo: "123@gmail.com",
            cargo: "Admin",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 1,
            name: "Angel Ricardo",
            correo: "123@gmail.com",
            cargo: "Admin",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 1,
            name: "Angel Ricardo",
            correo: "123@gmail.com",
            cargo: "Admin",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 1,
            name: "Angel Ricardo",
            correo: "123@gmail.com",
            cargo: "Admin",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 1,
            name: "Angel Ricardo",
            correo: "123@gmail.com",
            cargo: "Admin",
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
                            Administradores
                        </h4>
                    </div>
                    <a href={"/agregar-administrador" + false}>
                        <button className="btn btn-info">Agregar administrador</button>
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

export default Admins;
