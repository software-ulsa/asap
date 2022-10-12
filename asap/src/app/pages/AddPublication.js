import React from "react";
import { useParams } from "react-router-dom";

function AddPublication() {
	const { editable } = useParams();

    const categories = [
        "Música",
        "Entretenimiento",
        "Deportes",
        "Moda & belleza inclusiva",
        "Arte & cultura",
        "Comida",
        "Gaming",
        "Viaje",
        "Anime & comics",
        "Actividades al aire libre",
        "Fitness",
        "Negocios & finanzas",
        "Ciencia",
      ];

	return (
		
		<>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              {editable === 'true' ? "Editar Publicacion" : "Agregar Publicacion"}
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
                        placeholder="Titulo"
                      />
                      <small id="name" class="form-text text-muted">
                        Titulo
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="file" />
                      <label class="custom-file-label" for="inputGroupFile01" disabled={!editable}>
                        Agregar imagen
                      </label>
                      <small id="name" class="form-text text-muted">
                        Imagen de publicacion
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                      <select className="form-control">
                        {categories.map((cat, index) => (
                          <option key={index+'cat'} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <small id="name" class="form-text text-muted">
                        Categoría
                      </small>
                    </div>
                  </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="name"
                        placeholder="Contenido"
                        disabled={!editable}
                      />
                      <small id="name" class="form-text text-muted">
                        Contenido
                      </small>
                    </div>
                  </div>
                  
              
                </div>
         
              </div>
            </div>
            {editable ? (
              <div className="row d-flex justify-content-center">
                <a href="/publicacion">
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

}
 
export default AddPublication