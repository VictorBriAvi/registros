import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import "../../style/Inicio.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import { useEffect } from "react";

const TiposDeServicios = () => {
  const { contextTheme } = useThemeContext();

  const {
    tiposServicios,
    isLoading,
    deleteTipoDeServicio,
    paginaSiguiente,
    paginaAnterior,
  } = useTiposDeServiciosLogic();

  const paginaClickSiguiente = (e) => {
    e.preventDefault();
    paginaSiguiente();
  };

  const paginaClickAnterior = (e) => {
    e.preventDefault();
    paginaAnterior();
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Precios de servicios</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-tipoDeServicio/`}>
                  <button className="btn btn-primary font-weight-normal ">
                    {<AiFillFileAdd />} Agregar
                  </button>
                </Link>
              </div>
              <div className="container my-2">
                <Link to={"/registros/servicios"}>
                  <button className="btn btn-info font-weight-normal text-white    ">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
              <div className="container my-2">
                <Link to={"/registros/servicios/porcentaje"}>
                  <button className="btn btn-warning font-weight-normal text-white    ">
                    Porcentaje
                  </button>
                </Link>
              </div>
            </div>
            <div className="table-responsive">
              <table
                className={`table table-${contextTheme} table-striped table-hover table-borderless `}
              >
                <thead>
                  <tr>
                    <th>Tipo de servicio</th>
                    <th>Precio efectivo o transferencia</th>
                    <th>Precio normal</th>
                    <th>Categoria servicio</th>
                  </tr>
                </thead>
                <tbody>
                  {tiposServicios.map((tipoDeServicio) => (
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
                          onClick={() =>
                            deleteTipoDeServicio(tipoDeServicio.id)
                          }
                          className="btn btn-danger font-weight-normal "
                        >
                          {<AiFillDelete />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Paso 4: Botón de "Siguiente" */}
      <button onClick={(e) => paginaClickSiguiente(e)}>Siguiente</button>
      <button onClick={(e) => paginaClickAnterior(e)}>Anterior</button>
    </div>
  );
};

export default TiposDeServicios;
