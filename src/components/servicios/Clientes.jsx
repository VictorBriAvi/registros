import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

import useClienteLogic from "../../Hooks/useClienteLogic";

import DataTable from "../components/dataTable";
import { Container } from "react-bootstrap";

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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Clientes</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-cliente/`}>
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
            </div>
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
