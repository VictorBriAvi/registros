import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const useServicioLogic = () => {
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const serviciosColletion = collection(db, "servicios");

  const getServicios = async () => {
    setIsLoading(true);
    const data = await getDocs(serviciosColletion);
    const serviciosData = [];

    for (const doc of data.docs) {
      const servicioData = doc.data();

      // Obtener el nombre del colaborador utilizando la referencia
      const colaboradorRef = servicioData.nombreCompletoEmpleado;
      const colaboradorSnapshot = await getDoc(colaboradorRef);
      const colaboradorData = colaboradorSnapshot.data();

      // Obtener el nombre del cliente utilizando la referencia
      const clienteRef = servicioData.nombreCompletoCliente;
      const clienteSnapshot = await getDoc(clienteRef);
      const clienteData = clienteSnapshot.data();

      // Obtener el nombre del tipo de pago utilizando la referencia
      const tipoDePagoRef = servicioData.nombreTipoDePago;
      const tipoDePagoSnapshot = await getDoc(tipoDePagoRef);
      const tipoDePagoData = tipoDePagoSnapshot.data();

      // Obtener el nombre del tipo de servicio utilizando la referencia
      const tipoDeServicioRef = servicioData.nombreServicio;
      const tipoDeServicioSnapshot = await getDoc(tipoDeServicioRef);
      const tipoDeServicioData = tipoDeServicioSnapshot.data();

      // Agregar el nombre del colaborador al objeto del servicio
      const servicio = {
        ...servicioData,
        id: doc.id,
        nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado, // Nombre del colaborador
        nombreCompletoCliente: clienteData.nombreCompletoCliente,
        nombreServicio: tipoDeServicioData.nombreServicio,
        nombreTipoDePago: tipoDePagoData.nombreTipoDePago,
        precioProducto: doc.data().precioProducto,
      };

      serviciosData.push(servicio);
    }

    const serviciosOrdenados = serviciosData.sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    setServicios(serviciosOrdenados);

    setIsLoading(false);
  };

  const getServicioById = async (id) => {
    const servicioDoc = doc(db, "servicios", id);
    const servicioEncontrado = await getDoc(servicioDoc);
    if (servicioEncontrado.exists()) {
      const servicioData = servicioEncontrado.data();

      const clienteRef = servicioData.nombreCompletoCliente;
      const clienteSnapshot = await getDoc(clienteRef);
      const clienteData = clienteSnapshot.data();

      const colaboradorRef = servicioData.nombreCompletoEmpleado;
      const colaboradorSnapshot = await getDoc(colaboradorRef);
      const colaboradorData = colaboradorSnapshot.data();

      const servicioRef = servicioData.nombreServicio;
      const servicioSnapshot = await getDoc(servicioRef);
      const tipoDeServicioData = servicioSnapshot.data();

      const tipoDePagoRef = servicioData.nombreTipoDePago;
      const tipoDePagoSnapshot = await getDoc(tipoDePagoRef);
      const tipoDeDatoData = tipoDePagoSnapshot.data();

      return {
        id: servicioEncontrado.id,
        nombreCompletoCliente: clienteData.nombreCompletoCliente,
        nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
        nombreServicio: tipoDeServicioData.nombreServicio,
        nombreTipoDepago: tipoDeDatoData.nombreTipoDePago,
        precioProducto: servicioData.precioProducto,
      };
    } else {
      return null;
    }
  };

  const addServicio = async (nuevoServicio) => {
    try {
      console.log(nuevoServicio);

      // Obtener las referencias de los documentos utilizando los ID proporcionados en nuevoServicio
      const clienteRef = doc(db, nuevoServicio.nombreCompletoCliente);
      const colaboradorRef = doc(db, nuevoServicio.nombreCompletoEmpleado);
      const tipoDeServicioRef = doc(db, nuevoServicio.nombreServicio);
      const tipoDePagoRef = doc(db, nuevoServicio.nombreTipoDePago);

      // Crear el objeto de servicio con las referencias
      const servicio = {
        nombreCompletoCliente: clienteRef,
        nombreCompletoEmpleado: colaboradorRef,
        nombreServicio: tipoDeServicioRef,
        nombreTipoDePago: tipoDePagoRef,
        precioProducto: nuevoServicio.precioProducto,
      };

      // Agregar el nuevo servicio a Firestore
      await addDoc(serviciosColletion, servicio);
      console.log(servicio);

      // Volver a cargar los servicios actualizados
      getServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const updateServicio = async (id, servicioActualizado) => {
    try {
      if (servicioActualizado.nombreTipoDePago) {
        const tipoDePagoRef = doc(db, servicioActualizado.nombreTipoDePago);
        servicioActualizado.nombreTipoDePago = tipoDePagoRef;
      }
      if (servicioActualizado.nombreCompletoEmpleado) {
        const empleadoRef = doc(db, servicioActualizado.nombreCompletoEmpleado);
        servicioActualizado.nombreCompletoEmpleado = empleadoRef;
      }
      if (servicioActualizado.nombreCompletoCliente) {
        const clienteRef = doc(db, servicioActualizado.nombreCompletoCliente);
        servicioActualizado.nombreCompletoCliente = clienteRef;
      }
      if (servicioActualizado.nombreServicio) {
        const servicioRef = doc(db, servicioActualizado.nombreServicio);
        servicioActualizado.nombreServicio = servicioRef;
      }

      const servicioDoc = doc(db, "servicios", id);
      console.log(servicioDoc);
      await updateDoc(servicioDoc, servicioActualizado);
      getServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteServicio = async (id) => {
    const servicioDoc = doc(db, "servicios", id);
    await deleteDoc(servicioDoc);
    getServicios();
  };

  useEffect(() => {
    getServicios();
  }, []);

  return {
    servicios,
    isLoading,
    addServicio,
    getServicioById,
    updateServicio,
    deleteServicio,
  };
};

export default useServicioLogic;
