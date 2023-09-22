import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";

import DataTable from "../components/dataTable";
import { Container } from "react-bootstrap";

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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Colaboradores</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-colaborador/`}>
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
