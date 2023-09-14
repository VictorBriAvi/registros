import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Button, Container } from "react-bootstrap";

const DataTable = ({
  data,
  deleteData,
  paginaSiguiente,
  paginaAnterior,
  columnaServicio,
  editUrl,
}) => {
  const paginaClickSiguiente = (e) => {
    e.preventDefault();
    paginaSiguiente();
  };

  const paginaClickAnterior = (e) => {
    e.preventDefault();
    paginaAnterior();
  };

  return (
    <div className="table-responsive">
      <table className={`table table-striped table-hover table-borderless `}>
        <thead>
          <tr>
            {columnaServicio.map((colum) => (
              <th key={colum.key}>{colum.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((servicio) => (
            <tr key={servicio.id}>
              {columnaServicio.map((colum) => (
                <td key={colum.key}>{servicio[colum.key]}</td>
              ))}

              <td>
                <Link to={`${editUrl}/${servicio.id}`}>
                  <button className="btn btn-primary font-weight-normal me-3">
                    {<AiFillEdit />}
                  </button>
                </Link>
                <button
                  className="btn btn-danger font-weight-normal "
                  onClick={() => deleteData(servicio.id)}
                >
                  {<AiFillDelete />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={(e) => paginaClickSiguiente(e)}>Siguiente</button>
      <button onClick={(e) => paginaClickAnterior(e)}>Anterior</button>
    </div>
  );
};

{
  /**          {tiposServicios.map((tipoDeServicio) => (
            <tr key={tipoDeServicio.id}>
              <td>{tipoDeServicio.nombreServicio}</td>
              <td>{tipoDeServicio.precioServicio}</td>
              <td>{tipoDeServicio.precioServicio * 1.2}</td>
              <td>{tipoDeServicio.tipoDeTrabajo}</td>
              <td>
                <Link
                  to={`/registros/editar-tipoDeServicio/${tipoDeServicio.id}`}
                >
                  <button className="btn btn-primary font-weight-normal me-3">
                    {<AiFillEdit />}
                  </button>
                </Link>
                <button
                  onClick={() => deleteTipoDeServicio(tipoDeServicio.id)}
                  className="btn btn-danger font-weight-normal "
                >
                  {<AiFillDelete />}
                </button>
              </td>
            </tr>
          ))} */
}

export default DataTable;
