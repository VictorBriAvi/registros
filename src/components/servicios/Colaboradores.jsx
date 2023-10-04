import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";

import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import TitulosPages from "../components/TitulosPages";

const Colaboradores = () => {
  const {
    colaboradores,
    isLoading,
    deleteColaborador,
    paginaSiguiente,
    paginaAnterior,
  } = useColaboradoresLogic();

  const columnaServicio = [
    { key: "nombreCompletoEmpleado", label: "Colaborador" },
    { key: "fechaNacimiento", label: "Fecha Nacimiento" },
    { key: "documentoNacional", label: "Documento" },
  ];

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <div>
        <div className="row">
          <div className="col-md-12">
            <TitulosPages
              titulo="Colaboradores"
              regresar={`/registros/servicios`}
            />

            <hr />
            <Container className="mb-3">
              <Row>
                <Col sm={12} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/crear-colaborador/`}
                    tituloBoton={"Agregar nuevo colaborador"}
                  />
                </Col>
              </Row>
            </Container>
            <Container>
              <DataTable
                columnaServicio={columnaServicio}
                data={colaboradores}
                deleteData={deleteColaborador}
                paginaSiguiente={paginaSiguiente}
                paginaAnterior={paginaAnterior}
                editUrl="/registros/editar-colaboradores"
              />
            </Container>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Colaboradores;
