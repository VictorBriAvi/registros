import { Button, Container } from "react-bootstrap";
import useGastosLogic from "../../Hooks/useGastosLogic";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import { VictoryPie } from "victory";
import { AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useState } from "react";
import moment from "moment";
import Select from "react-select";
import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";

const ArqueoDeCaja = () => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const { serviciosRangoFecha, isLoading, getServiciosPorRangoDeFecha } =
    useServicioLogic();
  const { gastosRangoFecha, isLoadingGasto, getGastosPorRangoDeFecha } =
    useGastosLogic();
  const { colaboradores } = useColaboradoresLogic();

  const [totalRealizado, setTotalRealizado] = useState(0);
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [nombreEmpleado, setNombreEmpleado] = useState("");

  const [empleado, setEmpleado] = useState({
    nombreCompletoEmpleado: "", // Estado para almacenar la categoría seleccionada
  });

  let totalIngresos = 0;
  let totalGastos = 0;

  const SelectColaborador = colaboradores
    ? colaboradores.map((colaborador) => ({
        value: colaborador.id,
        label: colaborador.nombreCompletoEmpleado,
      }))
    : [];

  // Suma de precios de productos
  serviciosRangoFecha.forEach((servicio) => {
    totalIngresos += parseFloat(servicio.precioProducto);
  });

  gastosRangoFecha.forEach((gasto) => {
    totalGastos += parseFloat(gasto.precioGasto);
  });
  const gananciaPerdida = totalIngresos - totalGastos;
  const total = totalIngresos + totalGastos;

  const porcentajeIngresos = Math.round((totalIngresos / total) * 100);
  const porcentajeGastos = Math.round((totalGastos / total) * 100);

  const data = [
    { x: "I", y: porcentajeIngresos },
    { x: "G", y: porcentajeGastos },
  ];

  const handleDateChangeInicio = (date) => {
    setFechaInicio(date);
  };

  const handleDateChangeFin = (date) => {
    setFechaFin(date);
  };
  const handleSelectChange = (selectOption, name) => {
    setEmpleado((prevServicio) => ({
      ...prevServicio,
      [name]: selectOption,
    }));
  };
  const handleEmpeladoCobro = (e) => {
    e.preventDefault();

    const empleadoSeleccionado = empleado.nombreCompletoEmpleado.label;

    // Filtra los servicios que coincidan con el nombre seleccionado
    const serviciosDelEmpleado = serviciosRangoFecha.filter(
      (servicio) => servicio.nombreCompletoEmpleado === empleadoSeleccionado
    );
    // Suma los valores de los servicios filtrados
    let totalCobro = 0;
    serviciosDelEmpleado.forEach((servicio) => {
      totalCobro += parseFloat(servicio.precioProducto);
    });
    const porcentaje35 = totalCobro * 0.35;
    const porcentaje35Entero = Math.round(porcentaje35);

    setTotalRealizado(totalCobro);
    setTotalPorcentaje(porcentaje35Entero);
    setNombreEmpleado(empleadoSeleccionado);
  };

  const handleBuscarPorRangoFecha = (e) => {
    e.preventDefault();

    const fechaSeleccionadaInicial = moment(fechaInicio).format("YYYY-MM-DD");
    const fechaSeleccionadaFinal = moment(fechaFin).format("YYYY-MM-DD");

    getServiciosPorRangoDeFecha(
      fechaSeleccionadaInicial,
      fechaSeleccionadaFinal
    );
    getGastosPorRangoDeFecha(fechaSeleccionadaInicial, fechaSeleccionadaFinal);
  };

  if (isLoading && isLoadingGasto) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <Link to={"/registros/servicios/tiposDeServicios"}>
        <button className="btn btn-info font-weight-normal text-white    ">
          {<AiOutlineRollback />} Regresar
        </button>
      </Link>
      <div className="row ">
        <div className="col-md-6 bg-warning">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>Filtra por fecha </h3>
            <DatePicker
              selected={fechaInicio}
              onChange={handleDateChangeInicio}
              placeholderText="¿ Que fecha buscamos?"
              dateFormat="dd/MM/yyyy"
              className="custom-datepicker" // Agrega una clase personalizada
            />
            <DatePicker
              selected={fechaFin}
              onChange={handleDateChangeFin}
              placeholderText="¿ Que fecha buscamos?"
              dateFormat="dd/MM/yyyy"
              className="custom-datepicker" // Agrega una clase personalizada
            />
            <Button onClick={(e) => handleBuscarPorRangoFecha(e)}>
              Buscar fecha
            </Button>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <p>Total ingreso : {`${totalIngresos}`}</p>
              </div>
            </div>
            <div className="col-12">
              <div className="text-center">
                <p>Total gastos : {`${totalGastos}`}</p>
              </div>
            </div>
            <div className="col-12">
              <div className="text-center">
                <p>
                  {gananciaPerdida >= 0
                    ? `Ganancia con ${gananciaPerdida}`
                    : `Pérdida con ${gananciaPerdida}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 bg-success">
          {/* Establecer el ancho del select */}
          <Select
            options={SelectColaborador}
            menuPlacement="bottom"
            onChange={(selectOption) =>
              handleSelectChange(selectOption, "nombreCompletoEmpleado")
            }
            value={empleado.nombreCompletoEmpleado}
          />
          <Button variant="primary" onClick={(e) => handleEmpeladoCobro(e)}>
            Buscar por codigo
          </Button>

          <h3>Empleado: {nombreEmpleado} </h3>
          <h5>Total realizado: {totalRealizado}</h5>
          <h5>Total a pagar: {totalPorcentaje}</h5>
        </div>

        {/*Aca comienza el grafico*/}
        <div className="col-md-6  ">
          <div style={{ width: "100%", maxWidth: "5000px", margin: "auto" }}>
            <VictoryPie
              data={data}
              colorScale={["#66BB6A", "#EF5350"]} // Colores para Ingresos y Gastos
              animate={{ duration: 2000 }}
              responsive={true}
              width={300} // Ajusta el ancho según tus necesidades
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ArqueoDeCaja;
