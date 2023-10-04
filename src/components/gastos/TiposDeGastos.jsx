import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";

import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";
import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import TitulosPages from "../components/TitulosPages";
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
        <TitulosPages titulo="Tipos de gastos" regresar={"/registros/gastos"} />
      </div>

      <hr />
      <Container>
        <Row>
          <Col sm={12} className="mt-3">
            <BotonesPrincipalesAgregar
              agregar={`/registros/gastos/TiposDeGastos/Agregar-TipoDeGasto`}
              tituloBoton={"Agregar nuevo tipo de gasto"}
            />
          </Col>
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
    </Container>
  );
};

export default TiposDeGastos;
