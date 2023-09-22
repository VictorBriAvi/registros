import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";

import useClienteLogic from "../../Hooks/useClienteLogic";
import { Toast } from "../../Alert/Aler";

const EditarCliente = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { clientes, getClienteById, updateCliente } = useClienteLogic();
  const [clienteById, setClienteById] = useState(null);

  const [clienteEdit, setClienteEdit] = useState({
    nombreCompletoCliente: "",

    fechaNacimiento: "",
  });

  useEffect(() => {
    const handleGetClienteById = async (id) => {
      const cliente = await getClienteById(id);
      setClienteById(cliente);
    };
    handleGetClienteById(params.id);
  }, []);

  //Aca estamos evaluando lo que el usuario ingrese en los inputs
  const handleChange = (e) => {
    setClienteEdit({
      ...clienteEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteActualizado = {};

    if (
      clienteEdit.nombreCompletoCliente.trim() === "" &&
      clienteEdit.fechaNacimiento.trim() === ""
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (clienteEdit.nombreCompletoCliente.trim() !== "") {
      clienteActualizado.nombreCompletoCliente =
        clienteEdit.nombreCompletoCliente.trim();
    }

    if (clienteEdit.fechaNacimiento.trim() !== "") {
      clienteActualizado.fechaNacimiento = clienteEdit.fechaNacimiento.trim();
    }

    const nombreClienteExistente = clientes.find(
      (p) => p.nombreCompletoEmpleado === clienteEdit.nombreCompletoCliente
    );

    if (nombreClienteExistente) {
      Toast.fire({
        icon: "error",
        title: "El nombre del colaborador ya esta existente",
      });
      return;
    }

    console.log(clienteActualizado);
    updateCliente(clienteById.id, clienteActualizado);
    Swal.fire("Buen Trabajo!", "has modificado al colaborador!", "success");
    navigate("/registros/clientes");
  };

  if (!clienteById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h1 className="text-center">Informacion del cliente</h1>

            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold ">Nombre del cliente</div>
                  <div className="text-center">
                    {clienteById.nombreCompletoCliente}
                  </div>
                </div>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Fecha Nacimiento</div>
                  <div className="text-center">
                    {moment(clienteById.fechaNacimiento).format("DD/MM/YYYY")}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <div className="text-center">
            <h1>Editar Cliente</h1>
            <h5>Aca puedes editar al cliente</h5>
            <hr />
          </div>
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="my-2">
                    <label htmlFor="1">
                      Ingrese el nombre del cliente
                      <span className="text-danger  fw-bold">*</span>
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="nombre cliente"
                      name="nombreCompletoCliente"
                      pattern="[A-Za-z\s]*"
                      value={clienteEdit.nombreCompletoCliente}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">Nombre Cliente </label>
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
                    value={clienteEdit.fechaNacimiento}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-5">
                  <div className="boton">
                    <button className="btn btn-primary font-weight-normal me-4">
                      {<AiOutlineSave />} Agregar
                    </button>
                    <Link to={"/registros/clientes"}>
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
    </div>
  );
};

export default EditarCliente;
