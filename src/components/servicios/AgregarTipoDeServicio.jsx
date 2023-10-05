import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import Select from "react-select";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import { Toast } from "../../Alert/Aler";
import { useAuth } from "../context/authContext";
import useCategoriasServiciosLogic from "../../Hooks/useCategoriasServiciosLogic";

const AgregarTipoDeServicio = () => {
  const navigate = useNavigate();
  const { addTipoDeServicio, tiposServicios } = useTiposDeServiciosLogic();
  const { categoriasServicios, isLoading } = useCategoriasServiciosLogic();
  const { user } = useAuth();

  console.log(categoriasServicios);

  const [servicio, setServicio] = useState({
    nombreServicio: "",
    tipoDeTrabajo: "",
    precioServicio: "",
  });

  const SelectCategoria = categoriasServicios
    ? categoriasServicios.map((tipoDeServicio) => ({
        value: tipoDeServicio.id,
        label: tipoDeServicio.nombreCategoriaServicio,
      }))
    : [];

  console.log(SelectCategoria);
  const handleChange = (selectOption, name) => {
    setServicio((prevServicio) => ({
      ...prevServicio,
      [name]: selectOption.value, // Cambia selectOption a selectOption.value
    }));
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
      console.log(servicio);
      const response = await addTipoDeServicio({
        ...servicio,
        usuarioId: user.uid,
      });
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");
      navigate("/registros/servicios/tiposDeServicios");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>Agregar nuevo tipo de servicio</h1>
          <h6>Aca puedes agregar los nuevos tipos de servicios </h6>
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

              <div>
                <label htmlFor="1">
                  Ingrese el tipo de servicio
                  <span className="text-danger  fw-bold">*</span>
                </label>
                <Select
                  options={SelectCategoria}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "tipoDeTrabajo")
                  }
                  value={SelectCategoria.find(
                    (option) => option.value === servicio.tipoDeTrabajo
                  )} // Actualiza el valor
                />
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
                <Link to={"/registros/servicios/tiposDeServicios"}>
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
