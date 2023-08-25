import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Toast } from "../../Alert/Aler";

import "../../style/productos.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";
import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";

const EditarTipoDegasto = () => {
  const { contextTheme } = useThemeContext();
  const params = useParams();
  const navigate = useNavigate();

  const { tiposDeGastos, getTipoDeGastoById, updateTipoDeGasto } =
    useTiposDeGastosLogic();
  const [tipoDeGastoById, setTipoDeGastoById] = useState(null);

  const [tipoDeGastoEdit, setTipoDeGastoEdit] = useState({
    nombreTipoDeGasto: "",
  });

  useEffect(() => {
    const handleGetTipoDeGastoById = async (id) => {
      const tipoDeGasto = await getTipoDeGastoById(id);
      setTipoDeGastoById(tipoDeGasto);
    };
    handleGetTipoDeGastoById(params.id);
  }, []);

  const handleChange = (e) => {
    setTipoDeGastoEdit({
      ...tipoDeGastoEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tipoDeGastoActualizado = {};

    if (tipoDeGastoEdit.nombreTipoDeGasto.trim() === "") {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }
    if (tipoDeGastoEdit.nombreTipoDeGasto.trim() !== "") {
      tipoDeGastoActualizado.nombreTipoDeGasto =
        tipoDeGastoEdit.nombreTipoDeGasto.trim();
    }

    const nombreTipoDeGastoExistente = tiposDeGastos.find(
      (p) => p.nombreTipoDeGasto === tipoDeGastoEdit.nombreTipoDeGasto
    );

    if (nombreTipoDeGastoExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    updateTipoDeGasto(tipoDeGastoById.id, tipoDeGastoActualizado);
    Swal.fire(
      "Buen Trabajo!",
      "has modificado modificado un tipo de pago!",
      "success"
    );
    navigate("/registros/gastos/TiposDeGastos");
  };

  if (!tipoDeGastoById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className={`${contextTheme}`}>
      <div className="container ">
        <div className="row">
          <div className="col-lg-6  contenedor-info  ">
            <h1>Informacion del tipo de gasto</h1>
            <ul className="list-group text-center">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold">Tipo de gasto</div>
                  <div className="text-center">
                    {tipoDeGastoById.nombreTipoDeGasto}
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
                    <label htmlFor="1">Ingrese el tipo de gasto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="name@example.com"
                      name="nombreTipoDeGasto"
                      value={tipoDeGastoEdit.nombreTipoDeGasto}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">Tipo de gasto</label>
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
    </div>
  );
};

export default EditarTipoDegasto;
