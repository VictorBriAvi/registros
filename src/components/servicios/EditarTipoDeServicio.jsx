import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Toast } from "../../Alert/Aler";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";

import useCategoriasServiciosLogic from "../../Hooks/useCategoriasServiciosLogic";

const EditarTipoDeServicio = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { categoriasServicios } = useCategoriasServiciosLogic();

  const SelectCategoria = categoriasServicios
    ? categoriasServicios.map((tipoDeServicio) => ({
        value: tipoDeServicio.id,
        label: tipoDeServicio.nombreCategoriaServicio,
      }))
    : [];

  const { tiposServicios, getTipoDeServicioById, updateTipoDeServicio } =
    useTiposDeServiciosLogic();
  const [tipoDeServicioById, setTipoDeServicioById] = useState(null);

  const [tipoDeServicioEdit, setTipoDeServicioEdit] = useState({
    nombreServicio: "",
    precioServicio: "",
    tipoDeTrabajo: "",
  });

  useEffect(() => {
    const handleGetTipoDeServicioById = async (id) => {
      const producto = await getTipoDeServicioById(id);
      setTipoDeServicioById(producto);
    };
    handleGetTipoDeServicioById(params.id);
  }, []);

  const handleChange = (e, name) => {
    if (name === "nombreServicio" || name === "precioServicio") {
      setTipoDeServicioEdit((prevServicio) => ({
        ...prevServicio,
        [name]: e.target.value,
      }));
    } else {
      setTipoDeServicioEdit((prevServicio) => ({
        ...prevServicio,
        [name]: e.label,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tipoDeServicioActualizado = {};

    if (
      tipoDeServicioEdit.nombreServicio.trim() === "" &&
      tipoDeServicioEdit.tipoDeTrabajo.trim() === "" &&
      tipoDeServicioEdit.tipoDeTrabajo > 0
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }
    if (tipoDeServicioEdit.nombreServicio.trim() !== "") {
      tipoDeServicioActualizado.nombreServicio =
        tipoDeServicioEdit.nombreServicio.trim();
    }
    if (tipoDeServicioEdit.tipoDeTrabajo.trim() !== "") {
      tipoDeServicioActualizado.tipoDeTrabajo =
        tipoDeServicioEdit.tipoDeTrabajo.trim();
    }
    if (tipoDeServicioEdit.precioServicio > 0) {
      tipoDeServicioActualizado.precioServicio =
        tipoDeServicioEdit.precioServicio;
    }

    const nombreServicioExistente = tiposServicios.find(
      (p) => p.nombreServicio === tipoDeServicioEdit.nombreServicio
    );

    if (nombreServicioExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    updateTipoDeServicio(tipoDeServicioById.id, tipoDeServicioActualizado);
    Swal.fire("Buen Trabajo!", "has modificado al cliente!", "success");
    navigate("/registros/servicios/tiposDeServicios");
  };

  if (!tipoDeServicioById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-lg-6  contenedor-info  ">
            <h1>Informacion del servicio</h1>
            <ul className="list-group text-center">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold">Nombre del Servicio</div>
                  <div className="text-center">
                    {tipoDeServicioById.nombreServicio}
                  </div>
                  <div className=" fw-bold">Categoria de Servicio</div>
                  <div className="text-center">
                    {tipoDeServicioById.tipoDeTrabajo}
                  </div>
                  <div className=" fw-bold">
                    Precio del Servicio en efectivo
                  </div>
                  <div className="text-center">
                    {tipoDeServicioById.precioServicio}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="my-2">
                    <label htmlFor="1">Ingrese el codigo del producto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="name@example.com"
                      name="nombreServicio"
                      value={tipoDeServicioEdit.nombreServicio}
                      onChange={(selectOption) =>
                        handleChange(selectOption, "nombreServicio")
                      }
                    />
                    <label htmlFor="1">Codigo Producto</label>
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
                      (option) =>
                        option.value === tipoDeServicioEdit.tipoDeTrabajo
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
                    value={tipoDeServicioEdit.precioServicio}
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
    </div>
  );
};

export default EditarTipoDeServicio;
