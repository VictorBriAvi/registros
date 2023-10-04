import { Link, useNavigate } from "react-router-dom";
import "../style/Inicio.css";

import "../style/Inicio.css";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useState } from "react";

import { FcInfo, FcAbout } from "react-icons/fc";
import "animate.css";
import { useAuth } from "./context/authContext";

const Inicio = () => {
  const [show, setShow] = useState(false);

  const { logOut, loading, user } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [mouseEncima, setMouseEncima] = useState(false);

  console.log(user.uid);
  const handleMouseEnter = () => {
    setMouseEncima(true);
  };

  const handleMouseLeave = () => {
    setMouseEncima(false);
  };

  const contenedor = (variable) => {
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

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <Container fluid className=" vh-100 contenedor_inicio">
      <Row className="align-items-center">
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4"
          onClick={handleLogout}
        >
          LogOut
        </button>
        <Col xs={12} className="text-center">
          <div>
            <FcInfo className="icono-info" onClick={handleShow} />
          </div>

          <h1 className="animacion-letras">Bienvenid@s</h1>
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {<FcAbout />} Informacion de como realice este proyecto
              {<FcAbout />}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              El proyecto que he desarrollado se centra en Time For You, un
              emprendimiento dedicado a la gestión de un salón de belleza. En
              este proyecto, he utilizado tecnologías como
              <strong> React y Firebase </strong> para construir la interfaz de
              usuario y las funcionalidades del frontend.
            </p>
            <p>
              En el <strong> lado del backend </strong>, hemos utilizado
              <strong> C# .NET</strong>, lo que nos permite construir una base
              sólida y segura para gestionar los datos y lógica de negocio del
              salón. Para la persistencia de datos, hemos optado por una{" "}
              <strong>base de datos relacional utilizando SQL Server</strong>,
              lo que nos permite manejar la información de manera estructurada y
              eficiente.
            </p>
            <p>
              <em>
                Es importante destacar que este proyecto es un trabajo en
                progreso constante. Continuamente estamos mejorando y ampliando
                sus funcionalidades para adaptarnos a las cambiantes necesidades
                del negocio y brindar una experiencia excepcional a nuestros
                usuarios.
              </em>
            </p>
            <h6>
              Para mas informacion contactame{" "}
              <a href="mailto:victor_15_avila@hotmail.es">
                enviándome un correo
              </a>
            </h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Gracias!
            </Button>
          </Modal.Footer>
        </Modal>

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
