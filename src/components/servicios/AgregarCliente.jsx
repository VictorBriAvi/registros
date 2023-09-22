import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

import moment from "moment";

import useClienteLogic from "../../Hooks/useClienteLogic";
import { Toast } from "../../Alert/Aler";
import "../../style/Inicio.css";
import "../../style/botones.css";

const AgregarCliente = () => {
  const navigate = useNavigate();
  const { clientes, isLoading, addCliente } = useClienteLogic();
  const [cliente, setCliente] = useState({
    nombreCompletoCliente: "",
    fechaNacimiento: "",
  });

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaFormateada = moment(cliente.fechaNacimiento).format(
      "DD/MM/YYYY"
    );

    if (cliente.nombreCompletoCliente.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el nombre del colaborador",
      });
      return;
    }

    if (fechaFormateada.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando la fecha de nacimiento",
      });
      return;
    }

    const nombreClienteExistente = clientes.find(
      (p) => p.nombreCompletoCliente === cliente.nombreCompletoCliente
    );

    if (nombreClienteExistente) {
      Toast.fire({
        icon: "error",
        title: "El nombre del colaborador ya esta existente",
      });
      return;
    }

    console.log(cliente);

    try {
      const respuesta = await addCliente(cliente);
      console.log(respuesta);
      navigate("/registros/clientes");
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
          <h1>Agregar Cliente</h1>
          <h5>Aca puedes agregar al cliente</h5>
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
                    placeholder="nombre colaborador"
                    name="nombreCompletoCliente"
                    pattern="[A-Za-z\s]*"
                    value={cliente.nombreCompletoCliente}
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
                  value={cliente.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarCliente;
