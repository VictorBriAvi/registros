import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import "../../style/Inicio.css";
import "../../style/botones.css";

import { useState } from "react";

import DataTable from "../components/dataTable";
import { Button, Container, Form } from "react-bootstrap";

const TiposDeServicios = () => {
  const [servicio, setServicio] = useState({
    tipoDeTrabajo: "", // Estado para almacenar la categoría seleccionada
  });
  const opcionesServicio = [
    "Manicura",
    "Peluquería",
    "Depilación",
    "Pestaña",
    "Color",
  ];

  const columnaServicio = [
    { key: "nombreServicio", label: "Tipo de servicio" },
    { key: "precioServicio", label: "Precio efectivo o transferencia" },
    { key: "precioServicioAumento", label: "Precio efectivo o transferencia" },
    { key: "tipoDeTrabajo", label: "Categoria servicio" },
  ];

  const {
    tiposServicios,
    isLoading,
    deleteTipoDeServicio,
    paginaSiguiente,
    paginaAnterior,
    buscarCategoria,
    getTiposDeServicios,
  } = useTiposDeServiciosLogic();

  const handleFiltraCategoria = (e) => {
    e.preventDefault();
    console.log(servicio);
    if (servicio.tipoDeTrabajo.trim() === "") {
      getTiposDeServicios();
    } else {
      buscarCategoria(servicio);
    }
  };

  const handleSelectChange = (e) => {
    setServicio({
      ...servicio,
      tipoDeTrabajo: e.target.value, // Almacena la categoría seleccionada
    });
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
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
            <Container
              fluid
              className=" justify-content-center align-items-center "
            >
              <fieldset>
                <label htmlFor="2">Buscar por categoría</label>
                <div className="form-floating mb-3">
                  <div className="row ">
                    <div className="col-md-6">
                      {/* Establecer el ancho del select */}
                      <Form.Select
                        aria-label="Default select example"
                        id="2"
                        name="tipoDeTrabajo"
                        value={servicio.tipoDeTrabajo}
                        onChange={handleSelectChange}
                        className="h-100"
                      >
                        <option value="">Todas</option>
                        {opcionesServicio.map((opcion, index) => (
                          <option key={index} value={opcion}>
                            {opcion}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    <div className="col-md-6">
                      {/* Establecer el ancho del botón */}
                      <Button
                        variant="primary"
                        onClick={(e) => handleFiltraCategoria(e)}
                      >
                        Mi Botón
                      </Button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </Container>
            {/** COMPONENTE DATATABLE : Esto carga los datos en una tabla para mostrarlos */}
            <DataTable
              columnaServicio={columnaServicio}
              data={tiposServicios}
              deleteData={deleteTipoDeServicio}
              paginaSiguiente={paginaSiguiente}
              paginaAnterior={paginaAnterior}
              editUrl="/registros/editar-tipoDeServicio"
            />
          </div>
        </div>
      </div>

      {/* Paso 4: Botón de "Siguiente" */}
    </Container>
  );
};

export default TiposDeServicios;
