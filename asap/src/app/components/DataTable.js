import React, { useState, useEffect } from "react";

const DataTable = (props) => {
  const [numberOfPages, setNumberOfPages] = useState(1);

  const [arrayOfData, setArrayOfData] = useState([]);

  const [arrayOfButtons, setArrayOfButtons] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [buttonSelected, setButtonSelected] = useState([]);

  var num = Math.ceil(props.data.length / 15);
  let temp = props.data;

  const getPages = () => {
    let array = [];
    setNumberOfPages(num);
    if (num === 1) {
      setArrayOfData((arrayOfData) => [...arrayOfData, temp]);
    } else {
      while (temp.length > 0) {
        let chunk = temp.splice(0, 15);
        setArrayOfData((arrayOfData) => [...arrayOfData, chunk]);
      }
    }
    var ar = [];
    for (let i = 0; i < num; i++) {
      var buttonState = false;
      ar.push(buttonState);
    }
    setButtonSelected(ar);
  };

  const handlePreviousClick = () => {
    if (currentPage - 1 === 0) {
      setCurrentPage(numberOfPages);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage + 1 > numberOfPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getPages();
  }, [props]);

  return (
    <>
      <div className="table-responsive">
        <table id="zero_config" className="table table-striped table-bordered no-wrap">
          <thead>
            <tr>
              {props.columns.map((col, index) => (
                <th key={index}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {arrayOfData &&
              arrayOfData[currentPage - 1]?.map((row, index1) => (
                <tr key={index1 + "row"}>
                  {props.columns.map((column, index2) => (
                    <td key={index1 + "cell" + index2}>
                      {column.type === "text" && row[column.name]}

                      {column.type === "delete" && (
                        <button className="btn btn-danger" onClick={() => row.deleteAction(row.id)}>
                          Eliminar
                        </button>
                      )}
                      {column.type === "edit" && (
                        <button className="btn btn-warning" onClick={() => row.editAction(row.id)}>
                          Editar
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="row d-flex justify-content-center ">
          <button className="btn btn-secondary" onClick={handlePreviousClick}>
            Anterior
          </button>
          {buttonSelected.map((btn, index) => (
            <button
              key={index + "btn"}
              className={" btn btn-" + (index + 1 === currentPage ? "dark" : "info")}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
          <button className="btn btn-secondary" onClick={handleNextClick}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
