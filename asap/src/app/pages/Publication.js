import React from "react";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";


const Publication = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: "Id",
            name: "id",
            type: "text",
        },
        {
            title: "Titulo",
            name: "titulo",
            type: "text",
        },
        {
            title: "Clasificacion",
            name: "clasificacion",
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
        navigate("/agregar-publicacion" + true + index);
    };

    const data = [
        {
            id: 1,
            titulo: "Champions League",
            clasificacion: "Deportivo",
            deleteAction: deleteFunc,
            editAction: editFunc,
        },
        {
            id: 2,
            titulo: "Puerto rico",
            clasificacion: "Viaje",
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
                            Publicacion
                        </h4>
                    </div>
                    <a href={"/agregar-publicacion" + false}>
                        <button className="btn btn-info">Agregar publicacion</button>
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
                                            placeholder="Buscar por titulo o id"
                  
                                        />
                                        <small id="name" class="form-text text-muted">
                                            Buscar por titulo o id
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

export default Publication;