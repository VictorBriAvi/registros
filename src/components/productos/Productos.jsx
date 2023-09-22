import { Link } from "react-router-dom";

//Importacion de iconos
import { AiOutlineRollback } from "react-icons/ai";

import { FcSearch, FcAddDatabase } from "react-icons/fc";

import useProductoLogic from "../../Hooks/useProductoLogic";
import "../../style/Productos.css";

import DataTable from "../components/DataTable";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";

const Productos = () => {
  const [productoState, setProductoState] = useState({
    nombreProducto: "", // Estado para almacenar la categoría seleccionada
  });

  const {
    productos,
    deleteProducto,
    isLoading,
    paginaSiguiente,
    paginaAnterior,
    buscarCategoria,
    getProductos,
    productosAll,
  } = useProductoLogic();

  const columnaServicio = [
    { key: "codigoProducto", label: "Codigo Producto" },
    { key: "nombreProducto", label: "Nombre Producto" },
    { key: "descripcionProducto", label: "Descripcion Producto" },
    { key: "precioProducto", label: "Precio Producto" },
    { key: "stock", label: "Stock Producto" },
  ];

  const SelectProductos = productosAll
    ? productosAll.map((tipoDeServicio) => ({
        value: tipoDeServicio.id,
        label: tipoDeServicio.nombreProducto,
      }))
    : [];
  const handleChange = (selectOption, name) => {
    setProductoState((prevServicio) => ({
      ...prevServicio,
      [name]: selectOption,
    }));
  };

  const handleFiltraCategoria = (e) => {
    e.preventDefault();

    if (productoState.nombreProducto.label === "") {
      getProductos();
    } else {
      buscarCategoria(productoState.nombreProducto);
    }
  };

  console.log();

  console.log(productoState);
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <h1 className="text-center ">Inventario de productos</h1>
      <hr />
      <div className="container">
        <Row>
          <Col sm={6}>
            <div className="contenedor_botones_superiores">
              <div className="container_boton ">
                <Link to={`/registros/crear-producto/`}>
                  <button className="fondo_boton agregar">
                    {<FcAddDatabase />} Agregar nuevo producto
                  </button>
                </Link>
                <Link to={"/registros/"}>
                  <button className="fondo_boton regresar">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </div>
          </Col>

          <Col sm={6}>
            <div className="my-5">
              <Container>
                <h3 className="text-center">Buscar por nombre del producto</h3>
                <Select
                  options={SelectProductos}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreProducto")
                  }
                  value={productoState.codigoProducto}
                />
                <div className="boton_buscar_contenedor">
                  {/* Establecer el ancho del botón */}
                  <button
                    className="boton_buscar"
                    onClick={(e) => handleFiltraCategoria(e)}
                  >
                    <FcSearch /> Buscar
                  </button>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
        <div className="table-responsive">
          <DataTable
            columnaServicio={columnaServicio}
            data={productos}
            deleteData={deleteProducto}
            paginaSiguiente={paginaSiguiente}
            paginaAnterior={paginaAnterior}
            editUrl="/registros/editar-producto"
          />
        </div>
      </div>
    </Container>
  );
};

export default Productos;

{
  /**
            <table
              className={`table table-${contextTheme} table-striped table-hover table-borderless `}
            >
              <thead>
                <tr>
                  <th>Codigo Producto</th>
                  <th>Nombre Producto</th>
                  <th>Descripcion Producto</th>
                  <th>Precio Producto</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.codigoProducto}</td>
                    <td>{producto.nombreProducto}</td>
                    <td>{producto.descripcionProducto}</td>
                    <td>{producto.precioProducto}</td>

                    <td>
                      <Link to={`/registros/editar-producto/${producto.id}`}>
                        <button className="btn btn-primary font-weight-normal ">
                          {<AiFillEdit />}
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteProducto(producto.id)}
                        className="btn btn-danger font-weight-normal "
                      >
                        {<AiFillDelete />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

*/
}
