import React from "react";
import { useParams } from "react-router-dom";

const AddPublicity = () => {
  const { editable } = useParams();

  return (
    <>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              {editable === 'true' ? "Editar Publicidad" : "Agregar Publicidad"}
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
                        placeholder="Nombre de la publicación"
                      />
                      <small id="name" class="form-text text-muted">
                        Nombre de la publicación
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
                  <div className="col-sm-12">
                    <div className="form-group">
                      <textarea disabled={!editable} className="form-control" rows={3}></textarea>
                      <small id="name" class="form-text text-muted">
                        Descripción de la publicación
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
                        placeholder="Empresa"
                        disabled={!editable}
                      />
                      <small id="name" class="form-text text-muted">
                        Empresa
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="mail"
                        className="form-control"
                        id="name"
                        placeholder="Email de empresa"
                      />
                      <small id="name" class="form-text text-muted">
                        Email de Empresa
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        disabled={!editable}
                        type="url"
                        className="form-control"
                        id="name"
                        placeholder="Url de la empresa"
                      />
                      <small id="name" class="form-text text-muted">
                        Url de la empresa
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input type="date" className="form-control" id="name" disabled={!editable} />
                      <small id="name" class="form-text text-muted">
                        Fecha de inicio de publicidad
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input type="date" className="form-control" id="name" disabled={!editable} />
                      <small id="name" class="form-text text-muted">
                        Fecha de fin de publicidad
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

export default AddPublicity;
