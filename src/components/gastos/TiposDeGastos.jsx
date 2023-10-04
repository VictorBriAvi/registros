import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";

import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";
import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
const TiposDeGastos = () => {
  const {
    tiposDeGastos,
    isLoadingGasto,
    deleteTipoDeGasto,
    paginaSiguiente,
    paginaAnterior,
  } = useTiposDeGastosLogic();

  const columnaServicio = [
    { key: "nombreTipoDeGasto", label: "Nombre del tipo de gasto" },
  ];

  if (isLoadingGasto) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
        <div>
          <div>
            <div>
              <h1 className="text-center">Tipos de gastos</h1>
            </div>

            <hr />
            <Container className="mb-3">
              <Row>
                <Col sm={6}>
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/gastos/TiposDeGastos/Agregar-TipoDeGasto`}
                    regresar={"/registros/gastos"}
                    tituloBoton={"Agregar nuevo tipo de gasto"}
                  />
                </Col>
                <Col sm={6}></Col>
              </Row>
            </Container>

            <DataTable
              columnaServicio={columnaServicio}
              data={tiposDeGastos}
              deleteData={deleteTipoDeGasto}
              paginaSiguiente={paginaSiguiente}
              paginaAnterior={paginaAnterior}
              editUrl="/registros/gastos/TiposDeGastos/editar-tipoDeGasto"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TiposDeGastos;
