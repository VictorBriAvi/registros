import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { Toast } from "../../Alert/Aler";

import "../../style/botones.css";

import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";

const AgregarTipoDeGasto = () => {
  const navigate = useNavigate();
  const { addTipoDeGasto, tiposDeGastos } = useTiposDeGastosLogic();

  const [tipoDeGasto, setTipoDeGasto] = useState({
    nombreTipoDeGasto: "",
  });
  const handleChange = (e) => {
    setTipoDeGasto({
      ...tipoDeGasto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tipoDeGasto);
    if (tipoDeGasto.nombreTipoDeGasto.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el servicio del producto",
      });
      return;
    }

    const tipoDeGastoExistente = tiposDeGastos.find(
      (p) => p.nombreTipoDeGasto === tipoDeGasto.nombreTipoDeGasto
    );

    if (tipoDeGastoExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    try {
      const response = await addTipoDeGasto(tipoDeGasto);
      Swal.fire(
        "Buen Trabajo!",
        "has agregado un nuevo tipo de pago!",
        "success"
      );
      navigate("/registros/gastos/TiposDeGastos");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>Agregar Tipos de gastos</h1>
          <h5>Aca puedes agregar los tipos de gastos</h5>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el tipo de tipo de gasto
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="tipoDeGasto"
                    name="nombreTipoDeGasto"
                    value={tipoDeGasto.nombreServicio}
                    onChange={handleChange}
                    pattern="[A-Za-z\s]+"
                  />
                  <label htmlFor="1">Ingrese el tipo de gasto </label>
                </div>
              </div>

              <div className="boton">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/gastos/TiposDeGastos"}>
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

export default AgregarTipoDeGasto;
