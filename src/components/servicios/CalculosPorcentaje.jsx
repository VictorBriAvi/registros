// AjustarPrecios.js

import React, { useState } from "react";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CalculosPorcentaje = () => {
  const navigate = useNavigate();
  const [porcentajeAumento, setPorcentajeAumento] = useState(0);

  const { tiposServicios, updateTipoDeServicio, subirServiciosPorCategoria } =
    useTiposDeServiciosLogic();

  const opcionesServicio = [
    "Manicura",
    "Peluquería",
    "Depilación",
    "Pestaña",
    "Color",
  ];

  const [servicio, setServicio] = useState({
    tipoDeTrabajo: "", // Estado para almacenar la categoría seleccionada
  });

  const handleSelectChange = (e) => {
    setServicio({
      ...servicio,
      tipoDeTrabajo: e.target.value, // Almacena la categoría seleccionada
    });
  };

  const aumentarPrecios = (e, porcentaje, categoriaSeleccionada) => {
    e.preventDefault();
    console.log(porcentaje, categoriaSeleccionada);

    if (categoriaSeleccionada) {
      subirServiciosPorCategoria(categoriaSeleccionada, porcentaje);
    }

    if (categoriaSeleccionada === "") {
      // Crear una copia de los tipos de servicio con los precios actualizados
      const nuevosPrecios = tiposServicios.map((servicio) => {
        const precioActual = servicio.precioServicio;
        const nuevoPrecio = precioActual * (1 + porcentaje / 100);
        console.log(
          `Precio actual: ${precioActual}, Nuevo precio: ${nuevoPrecio}`
        );

        return {
          ...servicio,
          precioServicio: nuevoPrecio,
        };
      });

      // Iterar sobre los servicios actualizados y llamar a la función de actualización
      nuevosPrecios.forEach(async (servicioActualizado) => {
        // Obtener el ID del servicio
        const idServicio = servicioActualizado.id;

        try {
          // Llamar a la función de actualización para cada servicio
          await updateTipoDeServicio(idServicio, servicioActualizado);
          navigate("/registros/servicios/tiposDeServicios");
        } catch (error) {
          console.log(
            `Error al actualizar el servicio con ID ${idServicio}:`,
            error
          );
        }
      });
    }
  };

  return (
    <Container className="ajustar-precios">
      <Container>
        <h3>Ajustar Precios</h3>

        {/**ACA COMIENZA EL SELECT */}
        <form>
          <fieldset>
            <div className="form-floating mb-3">
              <Form.Select
                aria-label="Default select example"
                id="2"
                name="tipoDeTrabajo"
                value={servicio.tipoDeTrabajo}
                onChange={handleSelectChange}
              >
                <option value="">Seleccione un servicio</option>
                {opcionesServicio.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </Form.Select>

              <label htmlFor="2">Seleccione el servicio</label>
            </div>
          </fieldset>

          {/** PORCENTAJE DE AUMENTO */}
          <fieldset>
            <label>Porcentaje de Aumento:</label>
            <div className="form-floating mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  %
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <input
                type="number"
                value={porcentajeAumento}
                onChange={(e) => setPorcentajeAumento(e.target.value)}
              />
            </div>
          </fieldset>
          <Button
            variant="success"
            onClick={(e) =>
              aumentarPrecios(e, porcentajeAumento, servicio.tipoDeTrabajo)
            }
          >
            Aumentar Precios
          </Button>
        </form>
      </Container>

      <Link to={`/registros/servicios/tiposDeServicios`}>
        <Button className="mt-5">Regresar</Button>
      </Link>
    </Container>
  );
};

export default CalculosPorcentaje;
