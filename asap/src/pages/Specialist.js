import React, { useState } from "react";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

function Specialist() {

    const navigate = useNavigate();

    const deleteFunc = function (index) {
        console.log("Delete" + index);
    };

    const editFunc = function (index) {
        navigate("/agregar-especialista" + true + index);
    };
    
    
      var dataOriginal = [
        {
          id: 1,
          name: "Juan Osorio Rodríguez",
          profession: "Psicólogo",
          specialty: "Psicología Cognitiva Conductual",
          idCard: "NVDFIHVB3U",
          phoneNumber: "9451120946",
          email:"osorioRJ@gmail.com",
          password:"123",
          cv: "curriculmVitae.pdf",
          deleteAction: deleteFunc,
          editAction: editFunc
        },
        {
            id: 2,
            name: "Luis Méndez Matías",
            profession: "Psicólogo",
            specialty: "Psicología Educativa",
            idCard: "DISACXWQ231",
            phoneNumber: "9451187242",
            email:"Luis@gmail.com",
            password:"12345",
            cv: "curriculmVitae.pdf",
            deleteAction: deleteFunc,
            editAction: editFunc
          },
          {
            id: 3,
            name: "Karyna Gijón Castillo",
            profession: "Psiquiatra",
            specialty: "Psiquiatría de la adolescencia",
            idCard: "URE3UB4FNO32",
            phoneNumber: "9452310325",
            email:"gijon@gmail.com",
            password:"123saqw",
            cv: "curriculmVitae.pdf",
            deleteAction: deleteFunc,
            editAction: editFunc
          },
          {
            id: 4,
            name: "Hector Guiménez Cruz",
            profession: "Psiquiatra",
            specialty: "Psiquiatría del adulto",
            idCard: "JNSIUDVN",
            phoneNumber: "9541193170",
            email:"hectorcruz@gmail.com",
            password:"123qwe5",
            cv: "curriculmVitae.pdf",
            deleteAction: deleteFunc,
            editAction: editFunc
          },
          {
            id: 5,
            name: "Flor Farías Santiago",
            profession: "Psicóloga",
            specialty: "Psicología clínica",
            idCard: "RI239VSDNQ",
            phoneNumber: "9512846101",
            email:"florfs@gmail.com",
            password:"123nsdjc",
            cv: "curriculmVitae.pdf",
            deleteAction: deleteFunc,
            editAction: editFunc
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
          title: "Profesión",
          name: "profession",
          type: "text",
        },
        {
          title: "Especialidad",
          name: "specialty",
          type: "text",
        },
        {
            title: "No. Cédula",
            name: "idCard",
            type: "text",
        },

        {
            title: "Teléfono",
            name: "phoneNumber",
            type: "text",
        },
        {
            title: "Correo electrónico",
            name: "email",
            type: "text",
        },
        {
            title: "Contraseña",
            name: "password",
            type: "text",
        },
        {
            title: "Curriculum Vitae",
            name: "cv",
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
                  Especialistas
                </h4>
              </div>
              <a href={"/agregar-especialista" + false}>
                <button className="btn btn-info">Agregar especialista</button>
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
                          placeholder="Buscar por nombre o no.Cédula"
                          value={search}
                          onChange={handleChange}
                        />
                        <small id="name" class="form-text text-muted">
                          Buscar por nombre o num.cédula
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

export default Specialist;