import { Link, useNavigate } from "react-router-dom";
import "../style/Inicio.css";

import "../style/Inicio.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

const Inicio = () => {
  const navigate = useNavigate();

  const [mouseEncima, setMouseEncima] = useState(false);

  const handleMouseEnter = () => {
    setMouseEncima(true);
  };

  const handleMouseLeave = () => {
    setMouseEncima(false);
  };

  const contenedor = (variable) => {
    console.log(variable);

    if (variable === "inventario") {
      navigate("/registros/productos");
    }
    if (variable === "ventas") {
      navigate("/registros/servicios");
    }
    if (variable === "gastos") {
      navigate("/registros/gastos");
    }
    if (variable === "caja") {
      navigate("/registros/arqueo-de-caja");
    }
  };
  return (
    <Container fluid className=" vh-100 contenedor_inicio">
      <Row className="align-items-center">
        <Col xs={12} className="text-center">
          <h1 className="animacion-letras">Bienvenid@s</h1>
        </Col>

        <Col xs={12}>
          <div className="contenedor_botones">
            <div
              className={`contenedor-boton ${
                mouseEncima ? "encimaMouse" : "afueraMouse"
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="boton boton_inventario"
                onClick={() => contenedor("inventario")}
              >
                <Link to={"/registros/productos"}>
                  <button className=" boton_solito">Inventario</button>
                </Link>
              </div>
            </div>

            <div className="contenedor-boton">
              <div
                className="boton boton_registros_ventas "
                onClick={() => contenedor("ventas")}
              >
                <Link to={"/registros/servicios"}>
                  <button className="boton_solito">Servicios y Ventas</button>
                </Link>
              </div>
            </div>

            <div className="contenedor-boton">
              <div
                className="boton boton_gastos"
                onClick={() => contenedor("gastos")}
              >
                <Link to={"/registros/gastos"}>
                  <button className="boton_solito">
                    Gastos y Tipos de gasto
                  </button>
                </Link>
              </div>
            </div>

            <div className="contenedor-boton">
              <div
                className="boton boton_caja"
                onClick={() => contenedor("caja")}
              >
                <Link to={"/registros/arqueo-de-caja"}>
                  <button className="boton_solito">Arqueo de caja</button>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio;
