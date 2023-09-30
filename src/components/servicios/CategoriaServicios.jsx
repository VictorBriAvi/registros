import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";

import DataTable from "../components/DataTable";

import useCategoriasServiciosLogic from "../../Hooks/useCategoriasServiciosLogic";

const CategoriaServicios = () => {
  const { isLoading, categoriasServicios, deleteCategoriaServicio } =
    useCategoriasServiciosLogic();

  console.log(categoriasServicios);
  const columnaCategoriaServicio = [
    { key: "nombreCategoriaServicio", label: "Categoria Servicio" },
  ];

  const paginaSiguiente = () => {
    console.log("pagina siguiente");
  };

  const paginaAnterior = () => {
    console.log("pagina anterior");
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <div>
        <h1 className="text-center ">Categoria Servicios</h1>

        <hr />

        <Row>
          <Col sm={6}>
            <BotonesPrincipalesAgregar
              agregar={`/registros/servicios/tiposDeServicios/categoriaServicio/agregar-categoria-servicio`}
              regresar={"/registros/servicios/tiposDeServicios"}
              tituloBoton={"Agregar nueva categoria"}
            />
          </Col>
        </Row>

        <div className="table-responsive">
          <DataTable
            columnaServicio={columnaCategoriaServicio}
            data={categoriasServicios}
            deleteData={deleteCategoriaServicio}
            paginaSiguiente={paginaSiguiente}
            paginaAnterior={paginaAnterior}
            editUrl="/registros/servicios/tiposDeServicios/categoriaServicio/editar-categoria-servicio"
          />
        </div>
      </div>
    </Container>
  );
};

export default CategoriaServicios;
