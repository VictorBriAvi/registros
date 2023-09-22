import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import { Toast } from "../../Alert/Aler";

const AgregarTipoDeServicio = () => {
  const navigate = useNavigate();
  const { addTipoDeServicio, tiposServicios } = useTiposDeServiciosLogic();

  const opcionesServicio = [
    "Manicura",
    "Peluquería",
    "Depilación",
    "Pestaña",
    "Color",
  ];

  const [servicio, setServicio] = useState({
    nombreServicio: "",
    tipoDeTrabajo: "",
    precioServicio: "",
  });
  const handleChange = (e) => {
    let value = e.target.value;

    // Si el campo es "precioServicio", convierte el valor a número
    if (e.target.name === "precioServicio") {
      value = parseFloat(value); // O parseInt si deseas un número entero
    }

    setServicio({
      ...servicio,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (servicio.nombreServicio.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el servicio del producto",
      });
      return;
    }

    const tipoDeServicioExistente = tiposServicios.find(
      (p) => p.nombreServicio === servicio.nombreServicio
    );

    if (tipoDeServicioExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    try {
      const response = await addTipoDeServicio(servicio);
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");
      navigate("/registros/tiposDeServicios");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>Agregar nuevo servicio</h1>
          <h5>Aca puedes agregar los nuevos servicios</h5>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el servicio
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="servicio"
                    name="nombreServicio"
                    value={servicio.nombreServicio}
                    onChange={handleChange}
                  />
                  <label htmlFor="1">Ingrese el servicio </label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="2"
                  name="tipoDeTrabajo"
                  value={servicio.tipoDeTrabajo}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un servicio</option>
                  {opcionesServicio.map((opcion, index) => (
                    <option key={index} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
                <label htmlFor="2">Seleccione el servicio</label>
              </div>

              <div className="my-2">
                <label htmlFor="3">
                  Ingresa el valor del servicio
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="3"
                  placeholder="precio producto"
                  name="precioServicio"
                  pattern="[0-9]+"
                  value={servicio.precioServicio}
                  onChange={(e) => handleChange(e, "precioServicio")}
                />
              </div>

              <div className="boton">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/tiposDeServicios"}>
                  <button className="btn btn-info font-weight-normal">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarTipoDeServicio;
