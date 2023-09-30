import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";

import { useState } from "react";

import DataTable from "../components/dataTable";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import { FcSearch } from "react-icons/fc";

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
      <div>
        <div>
          <div>
            <div>
              <h1 className="text-center">Tipos de servicios</h1>
              <Link
                to={`/registros/servicios/tiposDeServicios/categoriaServicio`}
              >
                <button>Categoria servicio</button>
              </Link>
            </div>

            <hr />
            <Container className="mb-3">
              <Row>
                <Col sm={6} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/servicios/tiposDeServicios/crear-tipoDeServicio`}
                    regresar={`/registros/servicios`}
                    tituloBoton={"Agregar nuevo tipo de servicio"}
                  />
                </Col>

                <Col sm={6}>
                  <div>
                    <div className="container my-2">
                      <Link to={"/registros/servicios/porcentaje"}>
                        <button className="btn btn-warning font-weight-normal text-white  mb-3  ">
                          Sumar precios segun el porcentaje Porcentaje
                        </button>
                      </Link>

                      <fieldset>
                        <label className="mb-2" htmlFor="2">
                          Buscar por la categoria del servicio
                        </label>
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
                                className="boton_buscar"
                                onClick={(e) => handleFiltraCategoria(e)}
                              >
                                <FcSearch /> Buscar por categoria
                              </Button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container
              fluid
              className=" justify-content-center align-items-center "
            ></Container>
            {/** COMPONENTE DATATABLE : Esto carga los datos en una tabla para mostrarlos */}
            <DataTable
              columnaServicio={columnaServicio}
              data={tiposServicios}
              deleteData={deleteTipoDeServicio}
              paginaSiguiente={paginaSiguiente}
              paginaAnterior={paginaAnterior}
              editUrl="/registros/servicios/tiposDeServicios/editar-tipoDeServicio"
            />
          </div>
        </div>
      </div>

      {/* Paso 4: Botón de "Siguiente" */}
    </Container>
  );
};

export default TiposDeServicios;
