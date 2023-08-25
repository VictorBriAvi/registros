import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate, useParams } from "react-router-dom";

import Select from "react-select";

import { useState } from "react";

import FichaInformacion from "../components/FichaInformacion";
import { useEffect } from "react";

import Swal from "sweetalert2";
import "../../style/productos.css";
import "../../style/botones.css";
import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";
import useGastosLogic from "../../Hooks/useGastosLogic";

const EditarGasto = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { tiposDeGastos } = useTiposDeGastosLogic();
  const { getGastoById, updateGasto } = useGastosLogic();

  const [gastoById, setGastoById] = useState(null);

  useEffect(() => {
    const handleGetGastoById = async (id) => {
      const gasto = await getGastoById(id);
      setGastoById(gasto);
    };
    handleGetGastoById(params.id);
  }, []);

  const [gastoEdit, setGastoEdit] = useState({
    precioGasto: "",
    descripcionGasto: "",
    nombreTipoDeGasto: "",
  });

  const SelectGasto = tiposDeGastos
    ? tiposDeGastos.map((tipoDeGasto) => ({
        value: tipoDeGasto.id,
        label: tipoDeGasto.nombreTipoDeGasto,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    if (name === "precioGasto") {
      setGastoEdit((prevGasto) => ({
        ...prevGasto,
        [name]: selectOption.target.value,
      }));
    } else {
      setGastoEdit((prevGasto) => ({
        ...prevGasto,
        [name]: selectOption,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const GastoActualizado = {};

    if (
      gastoEdit.nombreTipoDeGasto === "" &&
      gastoEdit.descripcionGasto === "" &&
      gastoEdit.precioGasto === ""
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (gastoEdit.nombreTipoDeGasto !== "") {
      GastoActualizado.nombreTipoDeGasto = `tiposDeGastos/${gastoEdit.nombreTipoDeGasto.value}`;
    }

    if (gastoEdit.descripcionGasto !== "") {
      GastoActualizado.descripcionGasto = gastoEdit.descripcionGasto;
    }

    if (gastoEdit.precioGasto !== "") {
      GastoActualizado.precioGasto = gastoEdit.precioGasto;
    }

    updateGasto(gastoById.id, GastoActualizado);
    navigate("/registros/gastos");
  };

  if (!gastoById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>Crear nuevo Servicio</h1>
        <h5>Aca puedes agregar nuevo servicios</h5>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12 ">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el cliente atendido
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectGasto}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreTipoDeGasto")
                  }
                  value={gastoEdit.nombreTipoDeGasto}
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
                  value={gastoEdit.descripcionGasto}
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
                  Ingresa el valor del servicio
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="4"
                  placeholder="precio gasto"
                  name="precioGasto"
                  pattern="[0-9]+"
                  value={gastoEdit.precioGasto}
                  onChange={(e) => handleChange(e, "precioGasto")}
                />
              </div>

              <div>
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

export default EditarGasto;
