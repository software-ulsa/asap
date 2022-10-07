import React from "react";
import { useParams } from "react-router-dom";

const AddSpecialist = () => {
  const { editable } = useParams();

  return (
    <>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              {editable === "true" ? "Editar Especialista" : "Agregar Especialista"}
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
                        placeholder="Nombre del especialista"
                      />
                      <small id="name" class="form-text text-muted">
                        Nombre
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
                        Imagen de publicación
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Profesión"
                        disabled={!editable}
                      />
                      <small id="name" class="form-text text-muted">
                        Profesión
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="email"
                        className="form-control"
                        id="name"
                        placeholder="Correo electrónico"
                      />
                      <small id="name" class="form-text text-muted">
                        Correo electrónico
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Especialidad"
                        disabled={!editable}
                      />
                      <small id="name" class="form-text text-muted">
                        Especialidad
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Contraseña"
                      />
                      <small id="name" class="form-text text-muted">
                        Contraseña
                      </small>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="No. Cédula"
                      />
                      <small id="name" class="form-text text-muted">
                        No. Cédula
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="file"
                        className="form-control"
                        id="name"
                        placeholder="Curriculum vitae"
                      />
                      <small id="name" class="form-text text-muted">
                        Curriculum vitae (PDF)
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="number"
                        className="form-control"
                        id="name"
                        placeholder="Teléfono"
                      />
                      <small id="name" class="form-text text-muted">
                        Teléfono
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {editable ? (
              <div className="row d-flex justify-content-center">
                <a href="/publicidad">
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

export default AddSpecialist;