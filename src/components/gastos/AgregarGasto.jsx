import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

import Select from "react-select";

import { useState } from "react";
import { Toast } from "../../Alert/Aler";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import Swal from "sweetalert2";
import "../../style/botones.css";
import moment from "moment";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import useGastosLogic from "../../Hooks/useGastosLogic";
import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";

const AgregarGasto = () => {
  const navigate = useNavigate();

  const { tiposDeGastos, isLoading } = useTiposDeGastosLogic();

  const { addGasto } = useGastosLogic();

  const [gasto, setGasto] = useState({
    precioGasto: "",
    descripcionGasto: "",
    nombreTipoDeGasto: "",
  });

  const SelectTiposDeGastos = tiposDeGastos
    ? tiposDeGastos.map((tipoDeGasto) => ({
        value: tipoDeGasto.id,
        label: tipoDeGasto.nombreTipoDeGasto,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    if (name === "precioGasto") {
      setGasto((prevGasto) => ({
        ...prevGasto,
        [name]: selectOption.target.value,
      }));
    } else {
      setGasto((prevGasto) => ({
        ...prevGasto,
        [name]: selectOption,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gasto);

    if (!gasto.nombreTipoDeGasto) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el tipo de gasto",
      });
      return;
    }

    if (!gasto.descripcionGasto) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando una descripcion al tipo de gasto",
      });
      return;
    }
    if (gasto.precioGasto <= 0 || gasto.precioGasto === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el gasto",
      });
      return;
    }

    try {
      const response = await addGasto({
        nombreTipoDeGasto: `tiposDeGastos/${gasto.nombreTipoDeGasto.value}`,
        descripcionGasto: gasto.descripcionGasto,
        precioGasto: gasto.precioGasto,
      });
      console.log(response);
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");
      navigate("/registros/gastos");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>Crear nuevo Servicio</h1>
        <h5>Aca puedes agregar nuevo servicios</h5>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el tipo de servicio
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectTiposDeGastos}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreTipoDeGasto")
                  }
                  value={gasto.nombreTipoDeGasto}
                />
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="3">Ingresa la descripcion del producto </label>
              </div>

              <div className="form-floating mb-3 letras">
                <input
                  type="text"
                  className="form-control"
                  id="3"
                  name="descripcionGasto"
                  placeholder="descripcion del gasto"
                  pattern="[A-Za-z\s]*"
                  value={gasto.descripcionGasto}
                  onChange={(e) =>
                    handleChange(e.target.value, "descripcionGasto")
                  }
                />
                <label htmlFor="3">Descripcion del gasto</label>
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="4">
                  Ingresa el valor del gasto
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="4"
                  placeholder="valor gasto"
                  name="precioGasto"
                  pattern="[0-9]+"
                  value={gasto.precioGasto}
                  onChange={(e) => handleChange(e, "precioGasto")}
                />
              </div>

              <div className="boton">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/gastos"}>
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
  );
};

export default AgregarGasto;
