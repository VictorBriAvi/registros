import { Link } from "react-router-dom";

//Importacion de iconos
import { AiOutlineRollback } from "react-icons/ai";

import { FcSearch } from "react-icons/fc";

import useProductoLogic from "../../Hooks/useProductoLogic";
import "../../style/Productos.css";

import DataTable from "../components/DataTable";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import { useAuth } from "../context/authContext";
import TitulosPages from "../components/TitulosPages";

const Productos = () => {
  const [productoState, setProductoState] = useState({
    nombreProducto: "", // Estado para almacenar la categoría seleccionada en el select
  });
  const { user, loading } = useAuth();

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
      setProductoState({ nombreProducto: "" });
    }
  };

  if (isLoading && loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Container>
        <div>
          <TitulosPages
            titulo="Inventario de Productos"
            regresar="/registros/"
          />
          <hr />

          <Row>
            <Col sm={6}>
              <div className="my-5">
                <Container>
                  <h3 className="text-center">
                    Buscar por nombre del producto
                  </h3>
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
            <Col sm={6}>
              <BotonesPrincipalesAgregar
                agregar={`/registros/crear-producto/`}
                tituloBoton={"Agregar nuevo producto"}
              />
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
    </div>
  );
};

export default Productos;
