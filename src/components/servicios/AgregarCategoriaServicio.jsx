import { useState } from "react";
import { Toast } from "../../Alert/Aler";
import { AiOutlineRollback, AiOutlineSave } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useCategoriasServiciosLogic from "../../Hooks/useCategoriasServiciosLogic";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";

const AgregarCategoriaServicio = () => {
  const navigate = useNavigate();
  const { categoriasServicios, addCategoriaServicios } =
    useCategoriasServiciosLogic();

  const { user } = useAuth();
  const [categoriaServicio, setCategoriaServicio] = useState({
    nombreCategoriaServicio: "",
    usuarioId: "",
  });

  const handleChange = (e) => {
    setCategoriaServicio({
      ...categoriaServicio,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(categoriasServicios);
    console.log(categoriaServicio.nombreCategoriaServicio);
    e.preventDefault();
    console.log("mandar info");
    if (categoriaServicio.nombreCategoriaServicio.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando ninguna categoria nueva",
      });
      return;
    }
    const categoriaServicioExiste = categoriasServicios.find(
      (p) =>
        p.nombreCategoriaServicio === categoriaServicio.nombreCategoriaServicio
    );

    if (categoriaServicioExiste) {
      Toast.fire({
        icon: "error",
        title: "El nombre de esta categoria ya esta existente",
      });
      return;
    }

    try {
      console.log(categoriaServicio);
      const response = await addCategoriaServicios({
        ...categoriaServicio,
        usuarioId: user.uid,
      });
      Swal.fire(
        "Buen Trabajo!",
        "has agregado una nueva categoria de servicio!",
        "success"
      );
      navigate("/registros/servicios/tiposDeServicios/categoriaServicio/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>Agregar nueva categoria de servicio</h1>
          <h6>Aca puedes agregar nuevas categorias de servicio</h6>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el nombre de la categoria
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="nombre categoria servicio"
                    name="nombreCategoriaServicio"
                    pattern="[A-Za-z\s]*"
                    value={categoriaServicio.nombreCategoriaServicio}
                    onChange={handleChange}
                  />
                  <label htmlFor="1">Nombre de categoria servicio </label>
                </div>
              </div>

              <div className="boton mt-5">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link
                  to={"/registros/servicios/tiposDeServicios/categoriaServicio"}
                >
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

export default AgregarCategoriaServicio;
