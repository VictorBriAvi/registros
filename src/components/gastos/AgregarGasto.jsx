import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate, useParams } from "react-router-dom";

import Select from "react-select";

import { useState } from "react";
import { Toast } from "../../Alert/Aler";

import Swal from "sweetalert2";

import moment from "moment";

import useGastosLogic from "../../Hooks/useGastosLogic";
import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";
import { useAuth } from "../context/authContext";

const AgregarGasto = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tiposDeGastos, isLoading } = useTiposDeGastosLogic();

  const { addGasto } = useGastosLogic();

  const [gasto, setGasto] = useState(() => {
    if (param.porcentajeColaborador) {
      // Si param.porcentajeColaborador tiene datos, configura el estado inicial con esos datos
      return {
        precioGasto: param.porcentajeColaborador,
        descripcionGasto: "", // Deja este campo vacío o configúralo según sea necesario
        nombreTipoDeGasto: "", // Deja este campo vacío o configúralo según sea necesario
        fechaGasto: "", // Deja este campo vacío o configúralo según sea necesario
      };
    } else {
      // Si param.porcentajeColaborador no tiene datos, configura el estado inicial con campos vacíos
      return {
        precioGasto: "",
        descripcionGasto: "",
        nombreTipoDeGasto: "",
        fechaGasto: "",
      };
    }
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
    console.log(param);

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
      const fechaActual = moment().format("YYYY-MM-DD");
      const response = await addGasto({
        nombreTipoDeGasto: `tiposDeGastos/${gasto.nombreTipoDeGasto.value}`,
        descripcionGasto: gasto.descripcionGasto,
        precioGasto: gasto.precioGasto,
        fechaGasto: fechaActual,
        usuarioId: user.uid,
      });
      console.log(response);
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");

      if (!param.porcentajeColaborador) {
        navigate("/registros/gastos");
      }

      if (param.porcentajeColaborador) {
        navigate("/registros/arqueo-de-caja");
      }
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
        <h1>Crear nuevo gasto</h1>
        <h6>Aca puedes agregar nuevos gastos</h6>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={handleSubmit}>
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
                <Link
                  to={
                    param.porcentajeColaborador
                      ? "/registros/arqueo-de-caja"
                      : "/registros/gastos"
                  }
                >
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
