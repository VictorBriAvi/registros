import { Link } from "react-router-dom";

//Importacion de iconos
import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileAdd,
  AiOutlineRollback,
} from "react-icons/ai";

import useProductoLogic from "../../Hooks/useProductoLogic";

const Productos = () => {
  const { productos, deleteProducto, isLoading } = useProductoLogic();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-3">Stock</h1>
      <hr />
      <div className="row">
        <div className="col-xs-12">
          <div className="contenedor_button">
            <div className="container my-2">
              <Link to={`/registros/crear-producto/`}>
                <button className="btn btn-primary font-weight-normal ">
                  {<AiFillFileAdd />} Agregar
                </button>
              </Link>
            </div>
            <div className="container my-2">
              <Link to={"/registros/"}>
                <button className="btn btn-info font-weight-normal text-white    ">
                  {<AiOutlineRollback />} Regresar
                </button>
              </Link>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Codigo Producto</th>
                <th>Nombre Producto</th>
                <th>Descripcion Producto</th>
                <th>Precio Producto</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.codigoProducto}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>{producto.descripcionProducto}</td>
                  <td>{producto.precioProducto}</td>

                  <td>
                    <Link to={`/registros/editar-producto/${producto.id}`}>
                      <button className="btn btn-primary font-weight-normal me-3">
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
        </div>
      </div>
    </div>
  );
};

export default Productos;
