import { Link } from "react-router-dom";

//Importacion de iconos
import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";

import useProductoLogic from "../../Hooks/useProductoLogic";

import "../../style/Inicio.css";
import "../../style/botones.css";
import DataTable from "../components/DataTable";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
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
        <div>
          <div>
            <div className="container boton ">
              <Link to={`/registros/crear-producto/`}>
                <button className="btn btn-primary font-weight-normal ">
                  {<AiFillFileAdd />} Agregar
                </button>
              </Link>
              <Link to={"/registros/"}>
                <button className="btn btn-info font-weight-normal text-white    ">
                  {<AiOutlineRollback />} Regresar
                </button>
              </Link>
            </div>
          </div>

          <div>
            <div className="row ">
              <div className="my-5">
                <Container>
                  <h3>buscar por codigo</h3>
                  <Select
                    options={SelectProductos}
                    menuPlacement="bottom"
                    onChange={(selectOption) =>
                      handleChange(selectOption, "nombreProducto")
                    }
                    value={productoState.codigoProducto}
                  />
                  <div className="col-md-6">
                    {/* Establecer el ancho del botón */}
                    <Button
                      variant="primary"
                      onClick={(e) => handleFiltraCategoria(e)}
                    >
                      Buscar
                    </Button>
                  </div>
                </Container>
              </div>
            </div>
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
