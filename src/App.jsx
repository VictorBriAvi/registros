import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgregarProducto from "./components/productos/AgregarProducto";
import Inicio from "./components/Inicio";
import EditarProducto from "./components/productos/EditarProducto";
import Productos from "./components/productos/Productos";
import Servicios from "./components/servicios/servicios";
import Colaboradores from "./components/servicios/Colaboradores";
import AgregarColaborador from "./components/servicios/AgregarColaborador";
import EditarColaborador from "./components/servicios/EditarColaborador";
import Clientes from "./components/servicios/Clientes";
import AgregarCliente from "./components/servicios/AgregarCliente";
import EditarCliente from "./components/servicios/EditarCliente";
import TiposDeServicios from "./components/servicios/TiposDeServicios";
import AgregarTipoDeServicio from "./components/servicios/AgregarTipoDeServicio";
import EditarTipoDeServicio from "./components/servicios/EditarTipoDeServicio";
import TiposDePago from "./components/servicios/TiposDePago";
import AgregarTipoDePago from "./components/servicios/AgregarTipoDePago";
import EditarTipoDePago from "./components/servicios/EditarTipoDePago";
import AgregarServicio from "./components/servicios/AgregarServicio";
import EditarServicio from "./components/servicios/EditarServicio";

function App() {
  return (
    <Routes>
      <Route path="/registros/" element={<Inicio />}></Route>
      {/** Aca comienza el route de productos */}
      <Route path="/registros/productos" element={<Productos />}></Route>
      <Route
        path="/registros/crear-producto"
        element={<AgregarProducto />}
      ></Route>
      <Route
        path="/registros/editar-producto/:id"
        element={<EditarProducto />}
      ></Route>

      {/** Aca comienza el route de servicios */}
      <Route path="/registros/servicios" element={<Servicios />}></Route>
      <Route
        path="/registros/crear-servicio/"
        element={<AgregarServicio />}
      ></Route>
      <Route
        path="/registros/editar-servicio/:id"
        element={<EditarServicio />}
      ></Route>

      {/** Aca comienza el route de colaboradores */}
      <Route
        path="/registros/colaboradores"
        element={<Colaboradores />}
      ></Route>
      <Route
        path="/registros/crear-colaborador"
        element={<AgregarColaborador />}
      ></Route>
      <Route
        path="/registros/editar-colaboradores/:id"
        element={<EditarColaborador />}
      />
      {/** Aca comienza el route de clientes */}
      <Route path="/registros/clientes" element={<Clientes />}></Route>
      <Route
        path="/registros/crear-cliente"
        element={<AgregarCliente />}
      ></Route>
      <Route
        path="/registros/editar-cliente/:id"
        element={<EditarCliente />}
      ></Route>

      {/** Aca comienza el route de tipos de servicios */}
      <Route
        path="/registros/tiposDeServicios"
        element={<TiposDeServicios />}
      ></Route>
      <Route
        path="/registros/crear-tipoDeServicio"
        element={<AgregarTipoDeServicio />}
      ></Route>
      <Route
        path="/registros/editar-tipoDeServicio/:id"
        element={<EditarTipoDeServicio />}
      />
      {/** Aca comienza el route de tipos de pago */}
      <Route path="/registros/tiposDePago" element={<TiposDePago />}></Route>
      <Route
        path="/registros/crear-tipoDePago"
        element={<AgregarTipoDePago />}
      ></Route>
      <Route
        path="/registros/editar-tipoDePago/:id"
        element={<EditarTipoDePago />}
      ></Route>
    </Routes>
  );
}

export default App;
