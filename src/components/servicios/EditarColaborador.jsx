import { useEffect, useState } from "react";

import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import moment from "moment";
import { Toast } from "../../Alert/Aler";
import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";

const EditarColaboradores = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { colaboradores, getColaboradorById, updateColaborador } =
    useColaboradoresLogic();
  const [colaboradorById, setColaboradorById] = useState(null);

  const [colaboradorEdit, setColaboradorEdit] = useState({
    nombreCompletoEmpleado: "",
    documentoNacional: "",
    fechaNacimiento: "",
  });

  useEffect(() => {
    const handleGetProductoById = async (id) => {
      const colaborador = await getColaboradorById(id);
      setColaboradorById(colaborador);
    };
    handleGetProductoById(params.id);
  }, []);

  //Aca estamos evaluando lo que el usuario ingrese en los inputs
  const handleChange = (e) => {
    setColaboradorEdit({
      ...colaboradorEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colaboradorActualizado = {};

    if (
      colaboradorEdit.nombreCompletoEmpleado.trim() === "" &&
      colaboradorEdit.documentoNacional.trim() === "" &&
      colaboradorEdit.fechaNacimiento.trim() === ""
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (colaboradorEdit.nombreCompletoEmpleado.trim() !== "") {
      colaboradorActualizado.nombreCompletoEmpleado =
        colaboradorEdit.nombreCompletoEmpleado.trim();
    }

    if (colaboradorEdit.documentoNacional.trim() !== "") {
      colaboradorActualizado.documentoNacional =
        colaboradorEdit.documentoNacional.trim();
    }
    if (colaboradorEdit.fechaNacimiento.trim() !== "") {
      colaboradorActualizado.fechaNacimiento =
        colaboradorEdit.fechaNacimiento.trim();
    }

    const nombreColaboradorExistente = colaboradores.find(
      (p) => p.nombreCompletoEmpleado === colaboradorEdit.nombreCompletoEmpleado
    );
    const DocumentoColaboradorExistente = colaboradores.find(
      (p) => p.documentoNacional === colaboradorEdit.documentoNacional
    );

    if (nombreColaboradorExistente) {
      Toast.fire({
        icon: "error",
        title: "El nombre del colaborador ya esta existente",
      });
      return;
    }
    if (DocumentoColaboradorExistente) {
      Toast.fire({
        icon: "error",
        title: "El documento del colaborador ya esta existente",
      });
      return;
    }
    console.log(colaboradorActualizado);
    updateColaborador(colaboradorById.id, colaboradorActualizado);
    Swal.fire("Buen Trabajo!", "has modificado al colaborador!", "success");
    navigate("/registros/colaboradores");
  };

  if (!colaboradorById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6  centrar  my-5">
          <h1>Informacion del producto</h1>

          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className=" fw-bold">Nombre del Colaborador</div>
                <div className="text-center">
                  {colaboradorById.nombreCompletoEmpleado}
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Documento Colaborador</div>
                <div className="text-center">
                  {colaboradorById.documentoNacional}
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Fecha Nacimiento</div>
                <div className="text-center">
                  {moment(colaboradorById.fechaNacimiento).format("DD/MM/YYYY")}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="text-center">
          <h1>Editar Colaborador</h1>
          <h5>Aca puedes editar los colaboradores</h5>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el nombre del colaborador
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="nombre colaborador"
                    name="nombreCompletoEmpleado"
                    pattern="[A-Za-z\s]*"
                    value={colaboradorEdit.nombreCompletoEmpleado}
                    onChange={handleChange}
                  />
                  <label htmlFor="1">Nombre Colaborador </label>
                </div>
              </div>

              <div>
                <div className="my-2">
                  <label htmlFor="2">
                    Ingresa el DNI del Colaborador
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="nombre colaborador"
                      name="documentoNacional"
                      pattern="[0-9]+"
                      value={colaboradorEdit.documentoNacional}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">DNI Colaborador </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="me-5" htmlFor="fechaNacimiento">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={colaboradorEdit.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <div>
                  <button className="btn btn-primary font-weight-normal me-4">
                    {<AiOutlineSave />} Agregar
                  </button>
                  <Link to={"/registros/colaboradores"}>
                    <button className="btn btn-info font-weight-normal">
                      {<AiOutlineRollback />} Regresar
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditarColaboradores;
