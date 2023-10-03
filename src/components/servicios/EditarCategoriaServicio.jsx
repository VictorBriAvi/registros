import { useNavigate, useParams } from "react-router";
import useCategoriasServiciosLogic from "../../Hooks/useCategoriasServiciosLogic";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { AiOutlineRollback, AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Toast } from "../../Alert/Aler";

const EditarCategoriaServicio = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    categoriasServicios,
    getCategoriasServiciosById,
    updateCategoriaServicio,
  } = useCategoriasServiciosLogic();

  const [categoriaServicioId, setCategoriaServicioId] = useState("");

  const [categoriaServicioEdit, setCategoriaServicioEdit] = useState({
    nombreCategoriaServicio: "",
  });
  useEffect(() => {
    const handleGetCategoriaServicioById = async (id) => {
      const categoria = await getCategoriasServiciosById(id);
      setCategoriaServicioId(categoria); // Asigna la categoría de servicio al estado
    };
    handleGetCategoriaServicioById(params.id);
  }, [params.id]);

  console.log(categoriaServicioId.nombreCategoriaServicio);

  const handleChange = (e) => {
    setCategoriaServicioEdit({
      ...categoriaServicioEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriaServicioActualizado = {};

    if (categoriaServicioEdit.nombreCategoriaServicio.trim() === "") {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (categoriaServicioEdit.nombreCategoriaServicio.trim() !== "") {
      categoriaServicioActualizado.nombreCategoriaServicio =
        categoriaServicioEdit.nombreCategoriaServicio.trim();
    }

    const nombreCategoriaServicioExistente = categoriasServicios.find(
      (p) =>
        p.nombreCategoriaServicio ===
        categoriaServicioEdit.nombreCategoriaServicio
    );

    if (nombreCategoriaServicioExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    updateCategoriaServicio(
      categoriaServicioId.id,
      categoriaServicioActualizado
    );
    Swal.fire(
      "Buen Trabajo!",
      "has modificado modificado la categoria del tipo de servicio!",
      "success"
    );
    navigate("/registros/servicios/tiposDeServicios/categoriaServicio");
  };

  if (!categoriaServicioId) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-lg-6  contenedor-info  ">
            <h1>Informacion de la categoria del tipo de servicio a editar</h1>
            <ul className="list-group text-center">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold">
                    Nombre categoria del tipo de servicio
                  </div>
                  <div className="text-center">
                    {categoriaServicioId.nombreCategoriaServicio}
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
                    <label htmlFor="1">
                      Edite el tipo de nombre que va a editar
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="name@example.com"
                      name="nombreTipoDeGasto"
                      value={categoriaServicioEdit.nombreCategoriaServicio}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">
                      Edite el tipo de nombre que va a editar
                    </label>
                  </div>
                </div>

                <div className="boton">
                  <button className="btn btn-primary font-weight-normal me-4">
                    {<AiOutlineSave />} Agregar
                  </button>

                  <Link
                    to={
                      "/registros/servicios/tiposDeServicios/categoriaServicio"
                    }
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
    </div>
  );
};

export default EditarCategoriaServicio;
