import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Toast } from "../../Alert/Aler";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import "../../style/productos.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";

const EditarTipoDeServicio = () => {
  const { contextTheme } = useThemeContext();
  const params = useParams();
  const navigate = useNavigate();

  const { tiposServicios, getTipoDeServicioById, updateTipoDeServicio } =
    useTiposDeServiciosLogic();
  const [tipoDeServicioById, setTipoDeServicioById] = useState(null);

  const [tipoDeServicioEdit, setTipoDeServicioEdit] = useState({
    nombreServicio: "",
  });

  useEffect(() => {
    const handleGetTipoDeServicioById = async (id) => {
      const producto = await getTipoDeServicioById(id);
      setTipoDeServicioById(producto);
    };
    handleGetTipoDeServicioById(params.id);
  }, []);

  console.log(tipoDeServicioById);

  const handleChange = (e) => {
    setTipoDeServicioEdit({
      ...tipoDeServicioEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tipoDeServicioActualizado = {};

    if (tipoDeServicioEdit.nombreServicio.trim() === "") {
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
    navigate("/registros/tiposDeServicios");
  };

  if (!tipoDeServicioById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className={`${contextTheme}`}>
      <div className="container ">
        <div className="row">
          <div className="col-lg-6  contenedor-info  ">
            <h1>Informacion del producto</h1>
            <ul className="list-group text-center">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold">Codigo del Producto</div>
                  <div className="text-center">
                    {tipoDeServicioById.nombreServicio}
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
                      onChange={handleChange}
                    />
                    <label htmlFor="1">Codigo Producto</label>
                  </div>
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
    </div>
  );
};

export default EditarTipoDeServicio;
