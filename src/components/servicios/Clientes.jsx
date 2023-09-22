import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

import useClienteLogic from "../../Hooks/useClienteLogic";

import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";

const Clientes = () => {
  const {
    clientes,
    isLoading,
    deleteCliente,
    paginaSiguiente,
    paginaAnterior,
  } = useClienteLogic();

  const columnaServicio = [
    { key: "nombreCompletoCliente", label: "Cliente" },
    { key: "fechaNacimiento", label: "Fecha Nacimiento" },
  ];

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
        <div>
          <div>
            <div>
              <h1 className="text-center">Clientes</h1>
            </div>

            <hr />

            <Container className="mb-3">
              <Row>
                <Col sm={6} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/crear-cliente/`}
                    regresar={`/registros/servicios`}
                    tituloBoton={"Agregar nuevo cliente"}
                  />
                </Col>

                <Col sm={6}></Col>
              </Row>
            </Container>

            <div className="table-responsive">
              <DataTable
                columnaServicio={columnaServicio}
                data={clientes}
                deleteData={deleteCliente}
                paginaSiguiente={paginaSiguiente}
                paginaAnterior={paginaAnterior}
                editUrl="/registros/editar-cliente"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Clientes;
