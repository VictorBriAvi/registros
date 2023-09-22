import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";

import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";

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
            <div>
              <h1 className="text-center ">Colaboradores</h1>
            </div>

            <hr />
            <Container className="mb-3">
              <Row>
                <Col sm={6} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/crear-colaborador/`}
                    regresar={`/registros/servicios`}
                    tituloBoton={"Agregar nuevo colaborador"}
                  />
                </Col>

                <Col sm={6}></Col>
              </Row>
            </Container>
            <div className="table-responsive">
              <DataTable
                columnaServicio={columnaServicio}
                data={colaboradores}
                deleteData={deleteColaborador}
                paginaSiguiente={paginaSiguiente}
                paginaAnterior={paginaAnterior}
                editUrl="/registros/editar-colaboradores"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Colaboradores;
