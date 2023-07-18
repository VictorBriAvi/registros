import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      <h1>Inicio de programa</h1>
      <hr />
      <Link to={"/registros/productos"}>
        <button>Stock</button>
      </Link>
      <Link to={"/registros/servicios"}>
        <button>Servicios</button>
      </Link>
    </div>
  );
};

export default Inicio;
