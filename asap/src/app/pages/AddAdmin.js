import React from "react";
import { useParams } from "react-router-dom";

const AddAdmin = () => {
  const { editable } = useParams();

  return (
    <>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              {editable === 'true' ? "Editar Administrador" : "Agregar Administrador"}
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb"></nav>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form>
            <div className="card" style={{ margin: "10px" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        disabled={!editable}
                        placeholder="Nombre del administrador"
                      />
                      <small id="name" class="form-text text-muted">
                        Nombre del administrador
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="file" />
                      <label class="custom-file-label" for="inputGroupFile01" disabled={!editable}>
                        Buscar archivo
                      </label>
                      <small id="name" class="form-text text-muted">
                        Imagen del administrador
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                    <input
                        disabled={!editable}
                        type="email"
                        className="form-control"
                        id="name"
                        placeholder="Email"
                      />
                        <small id="name" class="form-text text-muted">
                        Correo Electronico
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="name"
                        placeholder="Contraseña"
                        disabled={!editable}
                      />
                      <small id="name" class="form-text text-muted">
                        Contraseña
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Cargo"
                        disabled={!editable}
                      />
                      <small id="name" class="form-text text-muted">
                        Cargo
                      </small>
                    </div>
                  </div>
              
                </div>
         
              </div>
            </div>
            {editable ? (
              <div className="row d-flex justify-content-center">
                <a href="/administradores">
                  <button className="btn btn-danger" type="button">
                    Regresar
                  </button>
                </a>
                <button className="btn btn-info" type="submit">
                  Agregar
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
