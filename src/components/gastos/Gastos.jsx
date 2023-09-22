import { Link } from "react-router-dom";

import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useGastosLogic from "../../Hooks/useGastosLogic";

import "../../style/Inicio.css";
import "../../style/botones.css";
import DatePicker from "react-datepicker";
import DataTable from "../components/dataTable";
import { Button } from "react-bootstrap";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

const Cierres = () => {
  const {
    gastos,
    isLoadingGasto,
    deleteGasto,
    paginaSiguiente,
    paginaAnterior,
    getGastos,
  } = useGastosLogic();
  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const columnaServicio = [
    { key: "nombreTipoDeGasto", label: "Tipo de gasto" },
    { key: "descripcionGasto", label: "Descripcion" },
    { key: "precioGasto", label: "Valor Gasto" },
    { key: "fechaGasto", label: "Fecha del gasto" },
  ];

  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    const fecha = moment(fechaSeleccionada).format("YYYY-MM-DD");
    getGastos(fecha);
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM, YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  if (isLoadingGasto) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="boton_servicios">
              <h1>Gastos</h1>
              <div>
                <Link to={"/registros/gastos/TiposDeGastos"}>
                  <button className="btn btn-outline-primary me-3">
                    Tipos de gastos
                  </button>
                </Link>
              </div>
            </div>

            <hr />

            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-tipoDeGasto`}>
                  <button className="btn btn-primary font-weight-normal ">
                    {<AiFillFileAdd />} Agregar
                  </button>
                </Link>
              </div>
              <div className="container my-2">
                <Link to={"/registros/"}>
                  <button className="btn btn-info font-weight-normal text-white    ">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Filtra por fecha</h3>
              <DatePicker
                selected={fechaSeleccionada}
                onChange={handleDateChange}
                placeholderText="¿ Que fecha buscamos?"
                dateFormat="dd/MM/yyyy"
                className="custom-datepicker" // Agrega una clase personalizada
              />
              <Button onClick={(e) => handleBuscarPorFecha(e)}>
                Buscar fecha
              </Button>
            </div>

            <div className="table-responsive">
              <h4>Fecha actual: {fechaActual}</h4>
              <DataTable
                columnaServicio={columnaServicio}
                data={gastos}
                deleteData={deleteGasto}
                paginaSiguiente={paginaSiguiente}
                paginaAnterior={paginaAnterior}
                editUrl="/registros/gastos/editar-gasto"
              />
              {/**
              <table className="table table-striped table-hover table-borderless ">
                <thead>
                  <tr>
                    <th>Tipo de gasto</th>
                    <th>Descripcion </th>
                    <th>Valor Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {gastos.map((gasto) => (
                    <tr key={gasto.id}>
                      <td>{gasto.nombreTipoDeGasto}</td>
                      <td>{gasto.descripcionGasto}</td>
                      <td>{gasto.precioGasto}</td>

                      <td>
                        <Link to={`/registros/gastos/editar-gasto/${gasto.id}`}>
                          <button className="btn btn-primary font-weight-normal me-3">
                            {<AiFillEdit />}
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteGasto(gasto.id)}
                          className="btn btn-danger font-weight-normal "
                        >
                          {<AiFillDelete />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cierres;
