import "bootstrap/dist/css/bootstrap.css";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        {/** Aca comienza el route de productos */}
        <Route path="/productos" element={<Productos />}></Route>
        <Route path="/crear-producto" element={<AgregarProducto />}></Route>
        <Route path="/editar-producto/:id" element={<EditarProducto />}></Route>

        {/** Aca comienza el route de servicios */}
        <Route path="/servicios" element={<Servicios />}></Route>
        <Route path="/crear-servicio/" element={<AgregarServicio />}></Route>
        <Route path="/editar-servicio/:id" element={<EditarServicio />}></Route>

        {/** Aca comienza el route de colaboradores */}
        <Route path="/colaboradores" element={<Colaboradores />}></Route>
        <Route
          path="/crear-colaborador"
          element={<AgregarColaborador />}
        ></Route>
        <Route
          path="/editar-colaboradores/:id"
          element={<EditarColaborador />}
        />
        {/** Aca comienza el route de clientes */}
        <Route path="/clientes" element={<Clientes />}></Route>
        <Route path="/crear-cliente" element={<AgregarCliente />}></Route>
        <Route path="/editar-cliente/:id" element={<EditarCliente />}></Route>

        {/** Aca comienza el route de tipos de servicios */}
        <Route path="/tiposDeServicios" element={<TiposDeServicios />}></Route>
        <Route
          path="/crear-tipoDeServicio"
          element={<AgregarTipoDeServicio />}
        ></Route>
        <Route
          path="/editar-tipoDeServicio/:id"
          element={<EditarTipoDeServicio />}
        />
        {/** Aca comienza el route de tipos de pago */}
        <Route path="/tiposDePago" element={<TiposDePago />}></Route>
        <Route path="/crear-tipoDePago" element={<AgregarTipoDePago />}></Route>
        <Route
          path="/editar-tipoDePago/:id"
          element={<EditarTipoDePago />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
