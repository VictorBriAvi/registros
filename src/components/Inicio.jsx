import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      <h1>Inicio de programa</h1>
      <hr />
      <Link to={"/productos"}>
        <button>Stock</button>
      </Link>
      <Link to={"/servicios"}>
        <button>Servicios</button>
      </Link>
    </div>
  );
};

export default Inicio;
